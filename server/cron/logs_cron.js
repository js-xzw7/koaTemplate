/**
 *  清空日志文件
 *  *  *  *  *  *  *  *  *  *
 *  通配符定义
 *  *  *  *  *  *  *  *  *  *
 *   ┬ ┬ ┬ ┬ ┬ ┬
 *   │ │ │ │ │ |
 *   │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
 *   │ │ │ │ └───── month (1 - 12)
 *   │ │ │ └────────── day of month (1 - 31)
 *   │ │ └─────────────── hour (0 - 23)
 *   │ └──────────────────── minute (0 - 59)
 *   └───────────────────────── second (0 - 59, OPTIONAL) 
 * 
 **/ 
   

const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
const logger = global.logger.system;

class logsCron {
    constructor() {};

    static start() {
        schedule.scheduleJob('0 0 0 1 * *',() => {
            logger.info('启动清除日志定时器');
            let url = path.resolve(__dirname,'../../logs');

            //返回日志目录下所有内容
            let files = fs.readdirSync(url);

            files.forEach((file,index) => {
               let curPath = path.join(url,file);
               //判读是否为文件
               if(fs.statSync(curPath).isFile()){
                   fs.truncateSync(curPath,0);//清空日志文件
               } 
            });
        });
    };
}

module.exports = logsCron.start();