/**
 * @description User api 路由
 * @author mars
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

// 路由前缀
router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {

})

// 用户是否存在
router.post('/isExist', async (ctx, next) => {
    const {userName} = ctx.request.body
    ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {

})

module.exports = router
