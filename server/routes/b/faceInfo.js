
//人脸信息
const logger = global.logger.system;
const result = new (require('../../lib/result'));
const common = new (require('../../lib/common_api'));
const moment = require('moment');
const Sequelize = require('sequelize');
const _ = require('lodash');

class faceInfo {
    constructor(sequelize, po) {
        this.sequelize = sequelize;
        this.po = po;
    }

    //01.添加人脸信息
    async addFacePost(ctx) {
        try {
            let params = ctx.request.body;
            let { sex, age } = params;

            if (!sex || !age) return result.ERROR(ctx, '缺少参数！');

            let login_time = moment().format('YYYY-MM-DD HH:mm:ss');

            let TBFaceInfo = this.po(this.sequelize, 'tb_face_info');

            let face_id = common.uuid();
            await TBFaceInfo.create(_.merge(params, {
                face_id, login_time, login_number: 0
            }));

            result.OK(ctx, '成功！');
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

    //02.根据条件筛选人脸信息
    async filtrateFaceGet(ctx) {
        try {
            let { sex, age } = ctx.query;
            sex = sex || '男';
            age = age || 21;

            if (!sex || !age) return result.ERROR(ctx, '缺少参数！');

            let TBFaceInfo = this.po(this.sequelize, 'tb_face_info');

            let face_list = await TBFaceInfo.findAll({
                where: {
                    sex,
                    age: {
                        [Sequelize.Op.between]: [+age - 5, +age + 5]
                    }
                },
                order: [['login_time', 'asc'], ['login_number', 'desc']]
            });
            result.OK(ctx, '成功！', face_list);
        } catch (e) {
            logger.error(e);
            throw(e);
        }
    }

    //03.更新人脸信息
    async updateFaceInfoGet(ctx) {
        try {
            let params = ctx.query;
            let {user_id} = params;

            //调用人脸特征检测接口，获取年龄及性别特征

            let TBFaceInfo = this.po(this.sequelize, 'tb_face_info');

            await TBFaceInfo.update(params,{
                where: { user_id }
            });

            result.OK(ctx, '成功！');
        } catch (e) {
            logger.error(e);
            throw(e);
        }
    }

    
}

module.exports = faceInfo;