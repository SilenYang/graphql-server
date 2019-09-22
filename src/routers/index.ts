import Router, { RouterContext } from 'koa-router'
import { mysqlIns } from '../db'
import debug from 'debug'
import { IUserItem } from 'types'

const log = debug('graph:router')

const route = new Router()

route.prefix('/test')

route.get('/users', async (ctx: RouterContext, next: any) => {
  const result: IUserItem[] = await mysqlIns.query('select * from user_info')
  log('get users')
  log(result)
  ctx.ctx.body = {
    code: 200,
    data: result,
    message: 'ok'
  }
})

export default route
