import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import { mysql } from "../../db";
import debug from "debug";
import { todoMetaType } from "../types";

const log = debug("graph:query:todoList");

// 批量查询
const todoLists = {
  name: "query todoList",
  type: new GraphQLList(todoMetaType),
  args: {},
  description: "待办列表",
  async resolve() {
    return await mysql.query(`select * from todoLists`);
  },
};

// 根据id查询
const todoInfo = {
  name: "query a todoInfo",
  type: todoMetaType,
  // 传参
  args: {
    id: {
      name: "id",
      type: new GraphQLNonNull(GraphQLID), // 参数不为空
    },
  },
  description: "待办详情",
  async resolve(root: any, params: any, options: any) {
    log("todoInfo 传参：", JSON.stringify(params));
    return await mysql
      .query(`select * from todoLists where id = ?`, [params.id])
      .then((res: any) => {
        return res[0] || {};
      });
  },
};

export default { todoLists, todoInfo };
