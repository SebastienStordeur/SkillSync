import { getUsers, signup, httpLogin, httpGetUser } from "./users.controller";

module.exports = {
  Query: {
    getUsers: () => {
      return getUsers();
    },

    getUser: (_: null, args: any) => {
      return httpGetUser(args.id);
    },
  },
  Mutation: {
    signup: (_: null, args: any) => {
      return signup(args.user);
    },
    login: (_: null, args: any) => {
      return httpLogin(args.user);
    },
  },
};
