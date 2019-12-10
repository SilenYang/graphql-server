import user from "./query/user";
import todo from "./query/todolist";
import * as todoMutation from "./mutations/todolist";

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

//总查询对象
const querys = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    userLists: user.userLists,
    userInfo: user.userInfo,
    todolist: todo.todoLists,
    todoInfo: todo.todoInfo,
  }),
});

//总体变更对象
const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    update: todoMutation.updateTodo,
    add: todoMutation.addTodo,
    delete: todoMutation.deleteTodo,
  }),
});

//GraphQL总表
const schema = new GraphQLSchema({
  query: querys,
  mutation: mutations,
});

export default schema;
