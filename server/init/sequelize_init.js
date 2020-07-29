const SEQUELIZE = global.config.sequelize;
const SYSTEM_PATH = global.config.system_path;
const logger = global.logger.system;
const common = new (require('../lib/common_api'));
const path = require('path');

//建立连接
const Sequelize = require('sequelize');
global.sequelize = sequelize = new Sequelize(SEQUELIZE.database, SEQUELIZE.username, SEQUELIZE.password, SEQUELIZE.options);

//预加载实体类
let file_list = common.fileList(SYSTEM_PATH.entity_path)
file_list.filter(file => ~file.search(/^[^\.].*\.js$/)).forEach(file => {
    let tableName = file.substring(0,file.length - 3);
    let tablePath = path.resolve(SYSTEM_PATH.entity_path,tableName);
    sequelize.import(tablePath);
    logger.info(`loading [${tableName}]`)
})

//同步数据
if(SEQUELIZE.syncdb){
    sequelize.sync();
}


