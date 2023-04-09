import { signup, httpLogin, httpGetUser } from "./users.controller";
import fs from "fs";
import multer from "multer";

import { v4 as uuidv4 } from "uuid";

function ensureAuthenticated(context: any) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resumes/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("resume");

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
