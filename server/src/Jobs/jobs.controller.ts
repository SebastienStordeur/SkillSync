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

export async function httpDeleteJob(id: string) {
  try {
    const foundJob = await Job.findOne({ _id: id });

    if (!foundJob) {
      return { success: false, message: "This job doesn't exist" };
    }

    await Job.deleteOne({ _id: id });
    return { success: true, message: "Job successfully deleted" };
  } catch (error) {
    return { success: false, message: "An error occured. Try again later." };
  }
}
