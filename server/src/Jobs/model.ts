import Job from "./jobs.model";

export async function httpCreateJob(job: any) {
  const { title, description, company, salary, location, remote } = job;

  const newJob = new Job({
    title,
    description,
    company,
    salary,
    location,
    remote,
  });

  //checking if required fields are here
  //validating fields
  await newJob.save();
  return newJob;
}
