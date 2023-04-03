import { FC } from "react";

const JobCard: FC = (props: any) => {
  const { title, salary, company } = props;
  return (
    <article className="p-6 mx-auto w-3/4 max-w-4xl h-40 border">
      <div className="flex justify-between text-xl">
        <h2 className="">{title}</h2>
        <h3>{salary} €</h3>
      </div>

      <p>{company}</p>
    </article>
  );
};

export default JobCard;
