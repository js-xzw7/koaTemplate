//用户实例
const Model = require('sequelize').Model;
const _ = require('lodash');
const abstract = new (require('../server/lib/sequelize_abstract'));
module.exports = (sequelize,DataTypes) => {
    class TBFaceInfo extends Model { }
    
    TBFaceInfo.init(_.merge({
        "face_id": {
            "type": DataTypes.STRING(40),
            "comment": "人脸信息id",
            "field": "face_id",
            "allowNull": false,
            "primaryKey": true,
        }
    },abstract.defaultField(DataTypes),{
        "user_id": {
            "type": DataTypes.STRING(40),
            "comment": "用户id",
            "field": "user_id"
        },
        "age": {
            "type": DataTypes.INTEGER,
            "comment": "年龄",
            "field": "age"
        },
        "sex": {
            "type": DataTypes.STRING(40),
            "comment": "性别",
            "field": "sex"
        },
        "face_img": {
            "type": DataTypes.TEXT,
            "comment": "人脸图片",
            "field": "face_img"
        },
        "login_time": {
            "type": DataTypes.DATE,
            "comment": "最近一次登录时间",
            "field": "login_time"
        },
        "login_number": {
            "type": DataTypes.INTEGER,
            "comment": "登录次数",
            "field": "login_number"
        },

    }), {
        sequelize,
        modelName: 'tb_face_info'
    })

    return TBFaceInfo
}