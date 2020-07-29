//template
const logger = global.logger.system;
const result = new (require('../../lib/result'));

class template {
    constructor(sequelize, po) {
        this.sequelize = sequelize;
        this.po = po;
    }

    async template(ctx) {
        try {
           
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

    
}

module.exports = template;