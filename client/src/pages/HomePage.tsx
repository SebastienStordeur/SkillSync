import { useQuery } from "@apollo/client";
import { FC } from "react";
import GETJOBS_QUERY from "../graphql/QUERY/GetJobQuery";
import JobCard from "../components/Jobs/JobCard";

const HomePage: FC = () => {
  const { loading, error, data } = useQuery(GETJOBS_QUERY);
  console.log(data && data);
  return <div>{data && data.getJobs.map((job: any) => <JobCard {...job} key={job.id} />)}</div>;
};

export default HomePage;
