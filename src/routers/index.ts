import Router from 'koa-router'
import db from '../db/mysql'
import Debug from 'debug'
const debug = Debug('graph:router')

const route = new Router()

route.prefix('/test')

route.get('/users', async (ctx: any, next: any) => {
  const result = await db.query('select * from user_info')
  debug('get users')
  debug(result)
  ctx.body = {
    code: 200,
    data: true,
    message: 'ok'
  }
})

export default route
