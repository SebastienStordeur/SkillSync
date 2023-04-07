import React, { FC, Fragment } from "react";

export interface JobProps {
  job: {
    id?: string;
    title: string;
    description: string;
    location: string;
    company: string;
    salary: number;
    extra: {
      remote: boolean;
      type: string;
      vacations: number;
    };
  };
}

const Job: FC<JobProps> = ({ job }) => {
  console.log("JOB", job);
  const { title, description, location, company, salary } = job;

  return (
    <Fragment>
      <h2 className="uppercase text-xl font-semibold">{title}</h2>
      <h3 className="opacity-60 text-lg">
        <span className="uppercase">{company}</span> - <span>{location}</span>
      </h3>
      <p className="opacity-60 text-md">From {salary}€, depending on experience</p>
      <div className="mt-8">
        <h4 className="font-semibold text-xl">Description</h4>
        {description}
      </div>
    </Fragment>
  );
};

export default Job;
