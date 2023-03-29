import { signup, httpLogin, httpGetUser } from "./users.controller";

function ensureAuthenticated(context: any) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}

module.exports = {
  Query: {
    // Get current user using their ID from the context.
    GetCurrentUser: (_: null, args: null, context: any) => {
      ensureAuthenticated(context);
      return httpGetUser(context.user.id);
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
