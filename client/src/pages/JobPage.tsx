import { useQuery } from "@apollo/client";
import { FC } from "react";
import { useParams } from "react-router-dom";
import GETJOB_QUERY from "../graphql/QUERY/GetJobQuery";
import Job from "../components/Jobs/Job";
import Recommendation from "../components/Jobs/Recommendation";

const JobPage: FC = () => {
  const { jobId } = useParams();
  const { loading, error, data } = useQuery(GETJOB_QUERY, { variables: { id: jobId } });

  console.log(data && data);

  return (
    <section id="current-job-section" className="px-6 py-10 md:flex md:gap-12">
      {loading && <p className="w-screen text-2xl text-center mt-10">We are fetching your data, please wait.</p>}
      <div className="md:w-3/4">{data && <Job job={data.getJob.job} />}</div>
      <div className="">
        {data && data.getJob.recommendations && (
          <h4 className="font-semibold text-xl my-8 md:mt-0">Recommendations based on this job</h4>
        )}
        <div className="flex flex-col gap-8">
          {data &&
            data.getJob.recommendations.map((recommendedJob: any) => (
              <Recommendation job={recommendedJob} key={recommendedJob.id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default JobPage;
