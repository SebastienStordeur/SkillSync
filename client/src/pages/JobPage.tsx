import { useQuery } from "@apollo/client";
import { FC } from "react";
import { useParams } from "react-router-dom";
import GETJOB_QUERY from "../graphql/QUERY/GetJobQuery";
import Job from "../components/Jobs/Job";
import Recommendation from "../components/Jobs/Recommendation";

const JobPage: FC = () => {
  const { jobId } = useParams();

  const { loading, error, data } = useQuery(GETJOB_QUERY, { variables: { id: jobId } });

  return (
    <section id="current-job-section" className="p-6">
      {loading && <p>Data are loading</p>}
      {data && <Job job={data.getJob.job} />}
      <div className="">
        <h4 className="font-semibold text-xl">Recommendations based on this job</h4>
        {data &&
          data.getJob.recommendations.map((recommendedJob: any) => (
            <Recommendation job={recommendedJob} key={recommendedJob.id} />
          ))}
      </div>
    </section>
  );
};

export default JobPage;
