import Router, { RouterContext } from "koa-router";
import { mysql } from "../db";
import debug from "debug";
import { ITodoItme } from "../types";

const log = debug("graph:router");

const route = new Router();

route.prefix("/test");

route.get("/users", async (ctx: RouterContext, next: any) => {
  const result: any[] = await mysql.query("select * from user_info");
  // const result = <IUserItem[]>await mongo.find('user_info', { age: 12 })
  log(result);
  ctx.body = {
    code: 200,
    data: result,
    message: "ok",
  };
});

route.get("/todoList", async (ctx: RouterContext, next: any) => {
  const result: ITodoItme[] = await mysql.query("select * from todoLists");
  log(result);
  ctx.body = {
    code: 200,
    data: result,
    message: "ok",
  };
});

export default route;
