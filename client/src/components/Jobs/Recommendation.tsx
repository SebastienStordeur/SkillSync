import React, { FC } from "react";
import { JobProps } from "./Job";

const Recommendation: FC<JobProps> = ({ job }) => {
  console.log(job);

  const { title, description, location, company, salary } = job;
  return (
    <article className="border rounded-lg h-44 p-4">
      <h3 className="uppercase text-lg font-semibold">{title}</h3>
      <h4 className="opacity-60 text-lg">
        <span className="uppercase">{company}</span> - <span>{location}</span>
      </h4>
    </article>
  );
};

export default Recommendation;
