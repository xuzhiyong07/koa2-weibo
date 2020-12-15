const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message: 'test demo',
    isMe: false,
    blogList: [
      {
        id: 1,
        title: 'a'
      },
      {
        id: 2,
        title: 'b'
      },
      {
        id: 3,
        title: 'c'
      },
      {
        id: 4,
        title: 'd'
      }
    ]
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'profile API',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'loadMore API',
    userName,
    pageIndex
  }
})

module.exports = router
