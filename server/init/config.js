/* 参数配置 */

const path = require('path');

class config {
    constructor() {
        //基本数据
        this.basics = {
            project_name: 'koatemplate',    //项目名称
            root: process.cwd(),
            server_dir: 'server',           //后端主目录
            init_dir: 'init',               //后端初始化目录
            lib_dir: 'lib',                 //后端自定义库目录
            routes_dir: 'routes',           //后端路由目录
            public_dir: 'public',           //静态资源目录
            logs_dir: 'logs',               //日志目录
            cron_dir: 'cron',               //定时器目录
            entity_dir:'entity',            //实体类目录
        };

        //系统设置
        this.system = {
            host: '127.0.0.1',
            port: '3030',
        };

        //mongodb数据库配置
        this.mongodb = {
            host: '127.0.0.1',
            port: '27017',
            dbName: 'koaProject'
        };

        //系统路径
        this.system_path = {
            routes_path: path.resolve(this.basics.root, this.basics.server_dir, this.basics.routes_dir),    //路由路径 
            logs_path: path.resolve(this.basics.root, this.basics.server_dir, this.basics.logs_dir),        //日志存放路径
            entity_path: path.resolve(this.basics.root,this.basics.entity_dir),                             //实体类存放路径
        };

        //sequelize
        this.sequelize = {
            database: 'test',
            username: 'postgres',
            password: 'ok',
            options: {
                host: 'localhost',
                port: '5432',
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,         //抛出错误之前尝试获取连接的最长时间
                    idle: 10000,            //连接释放之前可以空闲的最长时间
                },
                define: {
                    timestamps: true,       //是否创建createdAt、updatedAt 字段
                    createdAt: 'create_date',
                    updatedAt: 'optr_date',
                    underscored: true,      //在所有属性上添加带下划线的字段，其中包括用户定义的属性，时间戳和外键。不会影响带有显式设置field选项的属性
                    freezeTableName: true,  //不会尝试更改模型名称以获取表名称。否则，型号名称将被复数
                }
            },
            syncdb:true,                   //同步数据库
        }
    };
}

module.exports = config;