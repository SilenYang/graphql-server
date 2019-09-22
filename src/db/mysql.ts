import mysql from 'mysql'
import { mysqlConfig } from '../config'
import Debug from 'debug'
import util from 'util'

const debug = Debug('graph:mysql')

class Mysql {
  private db: any
  private querys: any

  constructor(config: typeof mysqlConfig) {
    this.db = mysql.createConnection(config)
    this.db.connect((err: any) => {
      if (err) {
        throw err
      }
      debug('db Connected...')
    })
    this.querys = util.promisify(this.db.query).bind(this.db)
  }

  query = (sql: string, params = []) => {
    return this.querys(sql, params)
  }

  destory = () => {
    this.db.end((err: any) => {
      if (err) {
        debug('close db connect failed')
        throw err
      }
    })
  }
}

export default new Mysql(mysqlConfig)
