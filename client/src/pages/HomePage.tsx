import { useQuery } from "@apollo/client";
import { FC, useCallback, useEffect, useState } from "react";
import GETJOBS_QUERY from "../graphql/QUERY/GetJobQuery";
import JobCard from "../components/Jobs/JobCard";
import Filters from "../components/filters/Filters";

const HomePage: FC = () => {
  const { loading, error, data } = useQuery(GETJOBS_QUERY);

  const [jobs, setJobs] = useState(data ? data.getJobs : []);
  const [filters, setFilters] = useState<{ remote: boolean; minSalary: number }>({ remote: false, minSalary: 0 });

  const handleFilterChange = useCallback((name: string, value: boolean | string | number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }, []);

  const handleFilterJobs = useCallback(() => {
    if (data) {
      const filteredJobs = data.getJobs.filter((job: any) => {
        const remoteFilter = filters.remote === false || job.remote === true;
        const minSalaryFilter = job.salary >= filters.minSalary;

        return remoteFilter && minSalaryFilter;
      });

      setJobs(filteredJobs);
    }
  }, [data, filters]);

  useEffect(() => {
    handleFilterJobs();
  }, [data, filters]);

  useEffect(() => {
    if (data) {
      setJobs(data.getJobs);
    }
  }, [data]);

  return (
    <section id="job-section" className="flex flex-col justify-end gap-8 mt-8 max-w-7xl mx-auto">
      <div className="flex w-full">
        <Filters data={data && data.getJobs} onChange={handleFilterChange} />
        <div className="flex flex-col gap-4 w-3/4">
          {Array.isArray(jobs) && jobs.map((job: any) => <JobCard {...job} key={job.id} />)}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
