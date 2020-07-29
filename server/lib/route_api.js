//路由注册

const fs = require('fs');
const path = require('path');
const routes = require('koa-router')();
const ROUTES_PATH = global.config.system_path.routes_path || 'routes';
const logger = global.logger.system;
const API_REGEXP = /(?=[A-Z])/;
const abstract = new (require('../lib/sequelize_abstract'));

class routePath {

    //列出路由目录下的所有子目录
    list() {
        try {
            let files = fs.readdirSync(ROUTES_PATH);
            let folders = [];
            files.forEach(file => {
                '.DS_Store' !== file && fs.statSync(path.resolve(ROUTES_PATH, file)).isDirectory() && folders.push(file);
            });

            return folders;
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

    //注册当前目录下的所有实例
    regRoutes(dir) {
        try {
            //获取当前目录地址
            const dir_path = path.resolve(ROUTES_PATH, dir);
            const files = fs.readdirSync(dir_path);

            files.filter(file => ~file.search(/^[^\.].*\.js$/)).forEach(async file => {
                //获取文件名
                const fileName = file.substr(0, file.length - 3);

                //实例化
                const file_path = path.resolve(dir_path, file);
                const instantiation = new (require(file_path))(global.sequelize, abstract.import);

                //注册实例中函数路由
                await this.modrr(instantiation, fileName, dir);
            });

            return routes;
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

    //注册实例中函数路由
    modrr(instantiation, fileName, dir) {
        try {
            //获取该实例原型上的所有属性名称
            const proto_name = Object.getOwnPropertyNames(instantiation.__proto__);

            proto_name.forEach(p => {
                if (p === 'constructor') return;

                //解析函数名称(拆出restful请求方式)
                let url_arr = p.split(API_REGEXP)
                let method = url_arr.pop().toLocaleLowerCase();
                let url = url_arr.join('')
                let method_list = ['get', 'post', 'put', 'delete', 'patch']

                if (!method_list.includes(method)) {
                     /* throw (`${dir}/${fileName}/${p} 函数命名格式错误！`); */
                    routes['get'](`/${dir}/${fileName}/${p}`, instantiation[p].bind(instantiation));
                    routes['post'](`/${dir}/${fileName}/${p}`, instantiation[p].bind(instantiation));
                } else {
                    //注册路由，防止隐形丢失this,实例方法使用bind绑定this
                    routes[method](`/${dir}/${fileName}/${url}`, instantiation[p].bind(instantiation))
                }

            })

        } catch (e) {
            logger.error(e);
            throw (e)
        }
    }
}

module.exports = routePath;