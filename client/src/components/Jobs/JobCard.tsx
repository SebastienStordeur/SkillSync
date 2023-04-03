import { FC } from "react";
import MoreInfos from "./MoreInfos/MoreInfos";
import { Button } from "@mui/material";

const JobCard: FC = (props: any) => {
  console.log(props);
  const { title, salary, company, remote } = props;
  return (
    <article className="p-6 mx-auto w-2/4 max-w-4xl h-72 border border-blue bg-white rounded-lg">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p>{company}</p>
      </div>
      <p className="opacity-60">Yearly: {salary} €</p>
      {remote && <MoreInfos />}
      <Button variant="contained">Apply</Button>
    </article>
  );
};

export default JobCard;
