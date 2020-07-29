const _ = require('lodash');
const config = global.config.system_path;
const path = require('path');

class sequelize_abstract {

    //postgres默认字段
    defaultField(DataTypes) {
        return {
            create_date: {
                type: DataTypes.DATE
            },
            optr_date: {
                type: DataTypes.DATE
            }
        }
    }

    //options
    options(data) {
        return _.merge({
            timestamps: true,       //是否创建createdAt、updatedAt 字段
            createdAt: 'create_date',
            updatedAt: 'optr_date',
            underscored: true,      //在所有属性上添加带下划线的字段，其中包括用户定义的属性，时间戳和外键。不会影响带有显式设置field选项的属性
            freezeTableName: true,  //不会尝试更改模型名称以获取表名称。否则，型号名称将被复数
        },data)
    }

    //import
    import(sequelize,tableName){
        let entity_path = path.resolve(config.entity_path,tableName);
        return sequelize.import(entity_path);
    }
}

module.exports = sequelize_abstract