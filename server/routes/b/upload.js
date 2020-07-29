
//upload
const logger = global.logger.system;
const result = new (require('../../lib/result'));
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');

class upload {
    constructor(sequelize, po) {
        this.sequelize = sequelize;
        this.po = po;
    }

    async image(ctx) {
        try {
            const busboy = new Busboy({ headers: ctx.req.headers });
            ctx.req.pipe(busboy);
            let filePath;

            let analysis = await new Promise((resolve, reject) => {
                //监听文件解析
                busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                    logger.info(`File [${fieldname}]: filename: ${filename}`);

                    //将文件保存到指定路径
                    filePath = path.join('public/images/', filename);
                    file.pipe(fs.createWriteStream(filePath));

                    //开始解析文件流
                    file.on('data', (data) => {
                        logger.info(`File [${filename}] got ${data.length} bytes`);
                    });

                    //结束文件流
                    file.on('end', () => {
                        logger.info(`File [${filename}] Finishied`);
                        resolve('ok');
                    })
                });
            })

            if(analysis !== 'ok')
                result.ERROR(ctx,'文件上传失败！');

            result.OK(ctx,'文件上传成功！',{filePath:path.resolve(process.cwd(),filePath)});
        } catch (e) {
            logger.error(e);
            throw (e);
        }
    }

}

module.exports = upload;