/* import usersSchema from "./users.model"; */
import { getUsers, signup, httpLogin } from "./model";

module.exports = {
  Query: {
    getUsers: () => {
      return getUsers();
    },
    login: (_: null, args: any) => {
      return httpLogin(args.user);
    },
  },
  Mutation: {
    signup: (_: null, args: any) => {
      return signup(args.user);
    },
  },
};
