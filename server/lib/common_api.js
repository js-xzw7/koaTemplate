//共用方法啊

const fs = require('fs');
const path = require('path');
const logger = global.logger.system;

class common {

    //列出指定路径下所有的子目录
    dirList(dir_path) {
        try {
            let files = fs.readdirSync(dir_path);
            let folders = [];
            files.forEach(file => {
                '.DS_Store' !== file && fs.statSync(path.resolve(dir_path, file)).isDirectory() && folders.push(file);
            });

            return folders;
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

    //列出指定路径下所有的文件
    fileList(file_path) {
        try {
            let files = fs.readdirSync(file_path);
            let folders = [];
            files.forEach(file => {
                '.DS_Store' !== file && fs.statSync(path.resolve(file_path, file)).isFile() && folders.push(file);
            });

            return folders;
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

    //获取uuid
    uuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        /* return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()); */
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    }

}

module.exports = common;