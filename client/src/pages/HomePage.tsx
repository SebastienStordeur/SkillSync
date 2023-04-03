import { useQuery } from "@apollo/client";
import { FC, Fragment } from "react";
import GETJOBS_QUERY from "../graphql/QUERY/GetJobQuery";
import JobCard from "../components/Jobs/JobCard";
import Navbar from "../components/layout/Navbar";

const HomePage: FC = () => {
  const { loading, error, data } = useQuery(GETJOBS_QUERY);
  console.log(data && data);
  return (
    <Fragment>
      <Navbar />
      <section id="job-section" className="flex flex-col justify-end gap-8 mt-8">
        {data && data.getJobs.map((job: any) => <JobCard {...job} key={job.id} />)}
      </section>
    </Fragment>
  );
};

export default HomePage;
