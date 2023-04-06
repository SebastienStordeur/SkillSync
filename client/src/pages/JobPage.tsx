import { useQuery } from "@apollo/client";
import { FC } from "react";
import { useParams } from "react-router-dom";
import GETJOB_QUERY from "../graphql/QUERY/GetJobQuery";

const JobPage: FC = () => {
  const { jobId } = useParams();

  const { loading, error, data } = useQuery(GETJOB_QUERY, { variables: { id: jobId } });
  console.log(data && data.getJob.job);

  const { title, salary, company, description, remote, location } = data.getJob.job;

  return (
    <section id="current-job-section" className="p-6">
      <h2 className="uppercase text-xl font-semibold">{title}</h2>
      <h3 className="uppercase opacity-60 text-lg">{company}</h3>
      <p className="opacity-60 text-md">From {salary}€, depending on experience</p>

      <div className="mt-8">
        <h4>Description</h4>
        {description}
      </div>
    </section>
  );
};

export default JobPage;
