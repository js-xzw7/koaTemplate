//人员信息
const logger = global.logger.system;
const result = new (require('../../lib/result'));
const common = new (require('../../lib/common_api'));
const _ = require('lodash');

class user {
    constructor(sequelize,po){
        this.sequelize = sequelize;
        this.po = po;
    }

    //01.添加用户
    async addUserPost(ctx) {
        try {
            let params = ctx.request.body;
            let {} = params;

            let TBUser = this.po(this.sequelize,'tb_user');
            
            let user_id = common.uuid();
            await TBUser.create(_.merge(params,{
                user_id
            }));

            return result.OK(ctx,'添加用户成功！',{user_id});

        } catch (e) {
            logger.error(e);
            throw(e);
        }
    }

    //02.更改用户信息
    async updateUserPost(ctx) {
        try {
            let params = ctx.request.body;
            let {user_id} = params;

            let TBUser = this.po(this.sequelize,'tb_user');
            
            await TBUser.update(params,{
                where:{user_id}
            });

            return result.OK(ctx,'更改用户信息成功！',{user_id});

        } catch (e) {
            logger.error(e);
            throw(e);
        }
    }

    //03.查看所有用户信息
    async findAllUserGet(ctx) {
        try {
            let params = ctx.request.query;
            let {} = params;

            let TBUser = this.po(this.sequelize,'tb_user');
            
            let user_list = await TBUser.findAll({
                where:params
            });

            return result.OK(ctx,'成功！',{user_list});

        } catch (e) {
            logger.error(e);
            throw(e);
        }
    }

    //04.获取指定用户信息
    async findByIdGet(ctx) {
        try {
            let params = ctx.request.query;
            let {user_id} = params;

            let TBUser = this.po(this.sequelize,'tb_user');
            
            let user_info = await TBUser.findByPk(user_id);

            return result.OK(ctx,'成功！',{user_info});

        } catch (e) {
            logger.error(e);
            throw(e);
        }
    }

}

module.exports = user;