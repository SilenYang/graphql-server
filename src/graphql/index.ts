import user from "./schemas/user";

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

//总查询对象
const queryObj = new GraphQLObjectType({
  name: "query",
  fields: () => ({
    userLists: user.userLists,
    userInfo: user.userInfo,
  }),
});

//总体变更对象
// const mutationObj = new GraphQLObjectType({
//   name: "Mutation",
//   fields: () => ({
//     postLogin: postLogin,
//   }),
// });

//GraphQL总表
const schema = new GraphQLSchema({
  query: queryObj,
  //   mutation: mutationObj,
});

export default schema;
