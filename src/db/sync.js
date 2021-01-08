/**
 * @description 同步数据库
 * @author xuzhiy
 */

const seq = require('./seq')

require('./model/index')

// 测试链接
seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('error')
})

// 同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})
