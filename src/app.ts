import Koa from "koa";
import bodyParser from "koa-bodyparser";
import staticSource from "koa-static";
import path from "path";
import debug from "debug";
import router from "./routers";
import { RouterContext } from "koa-router";
import { ApolloServer, gql } from "apollo-server-koa";
import schema from "./graphql";

const log = debug("graph:index");

const app = new Koa();

// 使用中间件
app.use(staticSource(path.resolve(__dirname, "public")));
app.use(bodyParser());

app.use(async (ctx: RouterContext, next: any) => {
  log("Url: ", ctx.url);
  await next();
});

app.use(router.routes()).use(router.allowedMethods());

const server = new ApolloServer({
  schema,
});

// @ts-ignore
server.applyMiddleware({ app });

const port = 5000;
app.listen(port, () => log(`server listen on port: ${port}`));
