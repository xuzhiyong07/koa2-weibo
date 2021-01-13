const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { isProd } = require('./utils/env')
const { REDIS_CONF } = require('./conf/db')

// 路由
const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onErrorConf
if (isProd) {
    onErrorConf = {
        redirect: '/error'
    }
}
onerror(app, onErrorConf)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// 配置 session
app.keys = ['UIsdf_3452#%$']
app.use(session({
    key: 'weibo.sid', // cookie name  默认 koa.sid
    prefix: 'weibo:sess:', // redis key的前缀 默认 koa:sess:
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 一天
    },
    // ttl: 24 * 60 * 60 * 1000, // 默认与maxAge一致
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由一定要注册到最下面

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
