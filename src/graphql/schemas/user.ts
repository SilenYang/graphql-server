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

const log = debug("graph:schema:user");

// 定义user的数据类型
export const userInfoType = new GraphQLObjectType({
  name: "userInfoType",
  description: "user meta",
  fields: {
    _id: {
      type: GraphQLID,
    },
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    nickname: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    phone: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    avatar: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    sex: {
      type: GraphQLInt,
    },
  },
});

// 批量查询
const userLists = {
  name: "query user list",
  type: new GraphQLList(userInfoType),
  args: {},
  description: "用户列表",
  async resolve(root: any, params: any, options: any) {
    return await mysql.query(`select * from user_info`);
  },
};

// 根据id查询单个user数据
const userInfo = {
  name: "query user info",
  type: userInfoType,
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
