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

const log = debug("graph:schema:todoList");
