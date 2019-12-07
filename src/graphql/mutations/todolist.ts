import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";
import debug from "debug";
import { mysql } from "../../db";
import moment from "moment";
import { sqlInsertResponse } from "../../types";

const log = debug("graph:mutation:todolist");

interface IUpdateParams {
  params: {
    id: string;
    title: string;
    expiredTime: string;
    description: string;
  };
}

const outputType = new GraphQLObjectType({
  name: "output",
  fields: {
    id: { type: GraphQLString },
    success: { type: GraphQLBoolean },
  },
});

const inputType = new GraphQLInputObjectType({
  name: "inputMeta",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    expiredTime: { type: GraphQLString },
    createTime: { type: GraphQLString },
    checked: { type: GraphQLBoolean },
  }),
});

const updateTodo = {
  name: "update",
  type: outputType,
  description: "update todo",
  args: {
    params: { type: inputType },
  },
  resolve: async (value: any, args: IUpdateParams) => {
    log(args);
    const params = args.params;
    const result: sqlInsertResponse = await mysql.query(
      `update todoLists set title = ?, description = ?, expiredTime = ? where id = ?`,
      [params.title, params.description, params.expiredTime, params.id]
    );
    log(result);
    return {
      id: params.id,
      success: true,
    };
  },
};

const addTodo = {
  name: "add",
  type: outputType,
  description: "add a todo",
  args: {
    params: {
      type: new GraphQLInputObjectType({
        name: "meta",
        fields: {
          title: { type: GraphQLString },
          description: { type: GraphQLString },
          expiredTime: { type: GraphQLString },
        },
      }),
    },
  },
  resolve: async (value: any, args: IUpdateParams) => {
    log(JSON.stringify(args.params));
    const params = args.params;
    const result: sqlInsertResponse = await mysql.query(
      `insert into todoLists (title, expiredTime, createTime, description) values (?, ?, ?, ?)`,
      [params.title, params.expiredTime, moment().format("YYYY-MM-DD"), params.description]
    );
    return {
      id: result.insertId,
      success: true,
    };
  },
};

export { updateTodo, addTodo };
