//启动配置
global.config = config = new (require("./server/init/config"));
global.logger = logger = new (require('./server/init/log4_init'));
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser');
const routeApi = new (require('./server/lib/route_api'));

require('./server/init/sequelize_init')

//启动mongodb
/* require('./server/init/mongo_init'); */

//启动删除日志定时器
require('./server/cron/logs_cron');

//加载二级模块，循环注册路由
let list = routeApi.list();
list.forEach(async dir => {
  let child_route = await routeApi.regRoutes(dir);
  app.use(child_route.routes(),child_route.allowedMethods());
});

//错误处理器
onerror(app)

// 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 错误处理
app.on('error', (err, ctx) => {
  logger.system.error('server error', err, ctx)
});

module.exports = app;
