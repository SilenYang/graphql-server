import mysql from "mysql";
import { mysqlConfig } from "../config";
import debug from "debug";
import util from "util";
import { resolve } from "path";

const log = debug("graph:mysql");

class Mysql {
  private db: any;
  public query: any;

  constructor(config: typeof mysqlConfig) {
    this.db = mysql.createConnection(config);
    this.db.connect((err: any) => {
      if (err) {
        throw err;
      }
      log("mysql connected...");
    });
    this.query = util.promisify(this.db.query).bind(this.db);
  }

  destory = () => {
    this.db.end((err: any) => {
      if (err) {
        log("close db connect failed");
        throw err;
      }
    });
  };
}

export default new Mysql(mysqlConfig);
