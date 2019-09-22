import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import staticSource from 'koa-static'
import path from 'path'
import debug from 'debug'
import router from './routers'

const log = debug('graph:index')

const app = new Koa()

// 使用中间件
app.use(staticSource(path.resolve(__dirname, 'public')))
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
log('server listen on port: 3000')
