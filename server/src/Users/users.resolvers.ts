import { getUsers, signup, httpLogin, httpGetUser } from "./model";

module.exports = {
  Query: {
    getUsers: () => {
      return getUsers();
    },
    login: (_: null, args: any) => {
      return httpLogin(args.user);
    },
    getUser: (_: null, args: any) => {
      return httpGetUser(args.id);
    },
  },
  Mutation: {
    signup: (_: null, args: any) => {
      return signup(args.user);
    },
  },
};
