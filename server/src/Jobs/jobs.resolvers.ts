// import functions

import { httpCreateJob } from "./model";

module.exports = {
  Query: {
    //get jobs offers
    //get specific job offer
    //get offer with specific entitlement
  },
  Mutation: {
    createJob: (_: null, args: any) => {
      console.log(args.job);
      return httpCreateJob(args.job);
    },
    //post job offers
    // update job offers
    //delete
  },
};
