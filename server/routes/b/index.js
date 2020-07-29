//index
const logger = global.logger.system;
const result = new (require('../../lib/result'));

class index {
    constructor(sequelize, po) {
        this.sequelize = sequelize;
        this.po = po;
    }

    async hello(ctx) {
        try {
            await ctx.render('index', {
                title: 'Hello Koa 2!'
            });
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

    
}

module.exports = index;