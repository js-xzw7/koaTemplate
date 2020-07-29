//成员模型

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const db =  require('../server/init/mongo_init');

//定义模型字段
let user = new schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
        default:20,
    },
    sex:{
        type:String,
        default:'男'
    },
    interest:{
        type:Array,
    }

});


//创建数据模型
let userModel = db.model('user',user);
module.exports = userModel;