import { useQuery } from "@apollo/client";
import { FC } from "react";
import { useParams } from "react-router-dom";
import GETJOB_QUERY from "../graphql/QUERY/GetJobQuery";

const JobPage: FC = () => {
  const { jobId } = useParams();

  const { loading, error, data } = useQuery(GETJOB_QUERY, { variables: { id: jobId } });

  console.log(jobId);
  return <div>JobPage</div>;
};

export default JobPage;
