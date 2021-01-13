/**
 * @description result 返回数据模型
 * @author mars
 */

/**
 * 基础模块
 */
class BaseModel {
    constructor({errno, message, data}) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

/**
 * 成功数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super ({
            errno: 0,
            data
        })
    }
}

/**
 * 失败数据模型
 */
class ErrorModel extends BaseModel {
    constructor({errno, message}) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
