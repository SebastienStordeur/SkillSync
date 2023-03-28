/* import usersSchema from "./users.model"; */
import { signup } from "./model";

module.exports = {
  Query: {},
  Mutation: {
    signup: (_: any, args: any) => {
      return args.user;
    },
  },
};
