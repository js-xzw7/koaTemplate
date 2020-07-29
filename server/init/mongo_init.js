//连接mongodb

const mongoose = require('mongoose');
const config = new (require('./config'));
const logger = global.logger.system;
const dbUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;

//连接数据库
const db = mongoose.createConnection(dbUrl,{ useNewUrlParser: true,useUnifiedTopology: true });

//监听连接
db.on('open',() => {
    logger.info(`${config.mongodb.dbName}连接成功！`);
});

//监听错误
db.on('error',(e) => {
    logger.error(`${config.mongodb.dbName}连接错误：${e}`);
    //断开连接
    mongoose.disconnect();
});

//监听关闭
db.on('close',() => {
   logger.info(`${config.mongodb.dbName}关闭连接！`); 
});

module.exports = db;