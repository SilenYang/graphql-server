import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } from "graphql";

// 定义 todo
export const todoMetaType = new GraphQLObjectType({
  name: "todoListType",
  description: "meta",
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    expiredTime: {
      type: GraphQLString,
    },
    createTime: {
      type: GraphQLString,
    },
    checked: {
      type: GraphQLBoolean,
    },
  },
});

// 定义 user
export const userMetaType = new GraphQLObjectType({
  name: "userMetaType",
  description: "用户详情",
  fields: {
    id: {
      type: GraphQLID,
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
