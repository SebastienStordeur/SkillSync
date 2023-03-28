// import functions

import { httpCreateJob, httpDeleteJob } from "./jobs.controller";

function ensureAuthenticated(context: any) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}

module.exports = {
  Query: {
    //get jobs offers
    //get specific job offer
    //get offer with specific entitlement
  },
  Mutation: {
    createJob: (_: null, args: any, context: any) => {
      ensureAuthenticated(context);
      return httpCreateJob(args.job);
    },
    deleteJob: (_: null, args: { id: string }, context: any) => {
      ensureAuthenticated(context);
      return httpDeleteJob(args.id);
    },

    // update job offers
  },
};
