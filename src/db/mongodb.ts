import mongodb from 'mongodb'
import { mongoConfig } from '../config'
import debug from 'debug'

const log = debug('graph:mongo')

class MongoClient {
  private db: any = null
  private config: typeof mongoConfig
  constructor(config: typeof mongoConfig) {
    this.config = config
    this._connect()
  }

  private _connect() {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        mongodb.MongoClient.connect(
          this.config.url,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          },
          (err: Error, client: any) => {
            if (err) {
              reject(err)
            } else {
              log('mongo connected')
              this.db = client.db(this.config.database)
              resolve(this.db)
            }
          }
        )
      } else {
        resolve(this.db)
      }
    })
  }

  public find = (tableName: string, json = {}) => {
    return new Promise((resolve, reject) => {
      const result = this.db.collection(tableName).find(json)

      result.toArray((err: Error, data: any) => {
        err ? reject(err) : resolve(data)
      })
    })
  }
}

export default new MongoClient(mongoConfig)
