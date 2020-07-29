// mongodb 原始连接处理

const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectId = MongoDB.ObjectID;
const config = new (require('./config'));
const url = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;

class DB {
    //单例模式
    static getInstance() {
        if(!DB.instance) {
            DB.instance = new DB();
        }

        return DB.instance;
    }

    constructor() {
        this.dbClient = '';
    }

    //连接集合
    connect() {
        let _that = this;
        return new Promise((resolve,reject) => {
            //处理多次连接
            if(!_that.dbClient) {
                MongoClient.connect(url,{ useUnifiedTopology: true },(err,client) => {
                   if(err) {
                        reject(err);
                   }else{
                       _that.dbClient = client.db(config.mongodb.dbName);
                       resolve(_that.dbClient);
                   }
                });
            }else{
                resolve(_that.dbClient);
            }
        });
    }

    //增加 向指定集合中插入一条文档数据
    insertOne(collectionName,value){
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(value,(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //增加 向指定集合中插入多条文档数据(注意是数组）
    insertMany(collectionName,valueArry) {
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertMany(valueArry,(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //删除 指定条件的第一个文档
    deleteOne(collectionName,where) {
        return new Promise((resolve,rejcet) => {
            this.connect().then((db) => {
                db.collection(collectionName).deleteOne(where,(err,result) => {
                    if(err) {
                        rejcet(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //删除 指定条件的所有文档
    deleteMany(collectionName,where,) {
        return new Promise((resovle,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).deleteMany(where,(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resovle(result);
                    }
                });
            });
        });
    }

    //删除 指定id
    deleteById(collectionName,where){
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).remove({_id:ObjectId(where.id)},(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //更新 指定条件的第一个文档
    updateOne(collectionName,where,newValue) {
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).update(where,{$set:newValue},(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //更新 指定条件的所有文档
    updateMany(collectionName,where,newValue) {
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).update(where,{$set:newValue},{multi:true},(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                        
                    }
                });
            });
        });
    }

    //更新 指定id
    updateById(collectionName,where,newValue) {
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).update({_id:ObjectId(where.id)},{$set:newValue},(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //查询 指定条件的第一个文档
    findOne(collectionName,where) {
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).findOne(where,(err,result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //查询 指定条件的所有文档
    findMany(collectionName,where) {
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(where).sort({_id:1});
                result.toArray((err,result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

    //查询 指定id
    findById(collectionName,where){
        return new Promise((resolve,reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).findOne({_id:ObjectId(where.id)},(err,result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }

}

/* global.mongodb = DB.getInstance(); */
module.exports = DB.getInstance();