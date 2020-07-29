//用户实例
const Model = require('sequelize').Model;
const _ = require('lodash');
const abstract = new (require('../server/lib/sequelize_abstract'));
module.exports = (sequelize,DataTypes) => {
    class TBUse extends Model { }
    
    TBUse.init(_.merge({
        "user_id": {
            "type": DataTypes.STRING(40),
            "comment": "用户id",
            "field": "user_id",
            "allowNull": false,
            "primaryKey": true,
        }
    },abstract.defaultField(DataTypes),{
        "name": {
            "type": DataTypes.STRING(40),
            "comment": "用户名称",
            "field": "name"
        },
        "age": {
            "type": DataTypes.STRING(40),
            "comment": "用户年龄",
            "field": "age"
        },
        "sex": {
            "type": DataTypes.STRING(40),
            "comment": "用户性别",
            "field": "sex"
        },

    }), {
        sequelize,
        modelName: 'tb_user'
    })

    return TBUse
}