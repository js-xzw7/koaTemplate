//log4 初始化

const _ = require('lodash');
const log4js = require('log4js');
const path = require('path');
const config = new (require('../init/config'));

class log4 {
    constructor() {
        const appenders = [
            {type:'console'},
            {
                type:'file',
                filename:path.resolve(config.system_path.logs_path,`${config.basics.project_name}.log`),
                maxLogSize:20480000,
                backups:30,
                category:'project',
                level:'WARN'
            },{
                type:'file',
                filename:path.resolve(config.system_path.logs_path,`system.log`),
                maxLogSize:20480000,
                backups:30,
                category:'system',
                level:'ALL'
            },

        ];

        const _appenders = {};
        const _categories= {};

        appenders.forEach(appender => {
            let name = appender.category || 'default';
            _appenders[name] = _.omit(appender,['category','level']);
            _categories[name] = {appenders:[name,'default'],level:appender.level || 'ALL'};
        });

        log4js.configure({
            appenders: _appenders,
            categories: _categories,
            replaceConsole: true,
            pm2: true
        });

        const logger_export = {};
        appenders.forEach(appender => {
            let name = appender.category;
            if(name){
                let logger = log4js.getLogger(name);
                logger_export[name] = logger;

               /*  logger.setLevel(appender.level || 'ALL'); */
                logger.trace('TRACE is enabled now!');
                logger.debug('DEBUG is enabled now!');
                logger.info('INFO is a enabled now!');
                logger.warn('WARN is a enabled now!');
                logger.error('ERROR is a enabled now!');
                logger.fatal('FATAL is a enabled now!');
            }
        });

        return logger_export;
    }
}

module.exports = log4;