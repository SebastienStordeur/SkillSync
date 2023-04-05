import { httpCreateJob, httpDeleteJob, httpGetJob, httpGetJobs } from "./jobs.controller";

function ensureAuthenticated(context: any) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}

module.exports = {
  Query: {
    getJobs: () => {
      return httpGetJobs();
    },
    getJob: (_: null, args: { id: any }) => {
      console.log(args.id);
      return httpGetJob(args.id);
    },
    //get offer with specific entitlement =AKA SEARCh
  },
  Mutation: {
    createJob: (_: null, args: any, context: any) => {
      ensureAuthenticated(context);
      const userId = args.id || context.user.id;
      return httpCreateJob(args.job, userId);
    },
    deleteJob: (_: null, args: { id: string }, context: any) => {
      ensureAuthenticated(context);
      const userId = context.user.id;
      return httpDeleteJob(args.id, userId);
    },

    // update job offers
  },
};
