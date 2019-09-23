import Router, { RouterContext } from "koa-router";
import { mysql } from "../db";
import debug from "debug";
import { IUserItem } from "types";

const log = debug("graph:router");

const route = new Router();

route.prefix("/test");

route.get("/users", async (ctx: RouterContext, next: any) => {
  const result: IUserItem[] = await mysql.query("select * from user_info");
  // const result = <IUserItem[]>await mongo.find('user_info', { age: 12 })
  log("get users");
  log(result);
  ctx.body = {
    code: 200,
    data: result,
    message: "ok"
  };
});

export default route;
