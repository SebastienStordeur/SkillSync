import { signup, httpLogin, httpGetUser } from "./users.controller";

function ensureAuthenticated(context: any) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}

module.exports = {
  Query: {
    // Get current user using their ID from the context.
    GetCurrentUser: (_: null, args: { id: string | null }, context: any) => {
      ensureAuthenticated(context);
      const userId = args.id || context.user.id;
      return httpGetUser(userId);
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
