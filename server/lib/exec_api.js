//封装koa请求

const router = require('koa-router')();
const path = require('path');
const mongodb = require('../init/mongo_init');
const config = new (require('../init/config'));
const ROUTES_PATH = config.path.routes_path;


class execApi {
    constructor() {};

    async exec (routerpath,cxt,next){
        try {
            //获取请求路径
            let req_path = cxt.path;
            //匹配请求方法为驼峰格式;
            let method = cxt.method.toLowerCase().replace(/^\w/, function (c) {
                return c.toUpperCase();
            }); 
            //请求函数名称
            let fu_name = req_path.substring(req_path.lastIndexOf("\/"), req_path.length);
            //new 实例
            let class_action = new (require(path.resolve(ROUTES_PATH,routerpath))(mongodb));
            //调用实例方法
            let result = await class_action[`${fu_name}${method}`](cxt,next);
            cxt.throw = result;
        } catch (error) {
            console.log(error);
            cxt.throw = error;
        }
    }

    init (routerpath,cxt,next) {
        ['HEAD','OPTIONS','GET','PUT','PATCH','POST','DELETE'].forEach(m => {
            cxt.methods[m] && cxt.methods[m](this.exec);
        });

        return cxt;
    }
}

module.exports = execApi;