// import functions

import { httpCreateJob, httpDeleteJob } from "./jobs.controller";

module.exports = {
  Query: {
    //get jobs offers
    //get specific job offer
    //get offer with specific entitlement
  },
  Mutation: {
    createJob: (_: null, args: any) => {
      return httpCreateJob(args.job);
    },
    // update job offers
    //delete
    deleteJob: (_: null, args: { id: string }) => {
      return httpDeleteJob(args.id);
    },
  },
};
