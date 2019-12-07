import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";

import { mysql } from "../../db";
import debug from "debug";
import { userMetaType } from "../types";

const log = debug("graph:query:user");

// 批量查询
const userLists = {
  name: "query user list",
  type: new GraphQLList(userMetaType),
  args: {},
  description: "用户列表",
  async resolve(root: any, params: any, options: any) {
    return await mysql.query(`select * from user_info`);
  },
};

// 根据id查询单个user数据
const userInfo = {
  name: "query user info",
  type: userMetaType,
  // 传进来的参数
  args: {
    id: {
      name: "id",
      type: new GraphQLNonNull(GraphQLID), // 参数不为空
    },
  },
  description: "用户详情",
  async resolve(root: any, params: any, options: any) {
    return await mysql
      .query(`select * from user_info where id = ?`, [params.id])
      .then((res: any) => {
        return res[0] || {};
      });
  },
};

export default { userInfo, userLists };
