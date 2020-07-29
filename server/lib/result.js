//处理返回数据格式

class result {

    OK(ctx,msg,content,note) {
        msg = msg || '成功！';

        return ctx.body = {
            'ret':'OK',
            content,msg,note,
        }
    }

    ERROR(ctx,msg,error,note) {
        msg = msg || '失败！';

        return ctx.body = {
            'ret':'ERROR',
            error,msg,note
        }
    }
}

module.exports = result;