import { FC, Fragment } from "react";
import { JobProps } from "./Job";
import { Link } from "react-router-dom";

const Recommendation: FC<JobProps> = ({ job }) => {
  const { id, title, location, company, salary } = job;
  const extra = Object.entries(job.extra).slice(1);
  return (
    <Link to={`/job/${id}`}>
      <article className="border rounded-lg h-44 p-4">
        <h3 className="uppercase text-lg font-semibold">{title}</h3>
        <h4 className="opacity-60 text-lg">
          <span className="uppercase">{company}</span> - <span>{location}</span>
        </h4>
        <p className="opacity-60">Yearly: {salary} €</p>
        <div className="flex flex-start gap-4 flex-wrap ">
          {extra.map((param, index) => {
            return (
              <Fragment key={index}>
                {param[1] === true && <div className="w-fit bg-gray-300 px-4">{param[0]}</div>}
                {param[0] === "vacations" && typeof param[1] === "number" && param[1] > 0 && (
                  <div className="w-fit bg-gray-300 px-4">{param[1]} weeks vacations</div>
                )}
                {param[0] === "type" && <div className="w-fit bg-gray-300 px-4">{param[1]}</div>}
              </Fragment>
            );
          })}
        </div>
      </article>
    </Link>
  );
};

export default Recommendation;
