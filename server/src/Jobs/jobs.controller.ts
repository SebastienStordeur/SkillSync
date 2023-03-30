import Job from "./jobs.model";

export async function httpCreateJob(job: any, userId: string) {
  const { title, description, company, location, remote } = job;

  const newJob = new Job({
    title,
    description,
    company,

    location,
    remote,
    userId,
  });

  //checking if required fields are here
  //validating fields
  /* await newJob.save(); */
  return newJob;
}

export async function httpDeleteJob(id: string, userId: string) {
  try {
    const foundJob = await Job.findOne({ _id: id });

    console.log(userId === foundJob!.userId);

    if (!foundJob) {
      return { success: false, message: "This job doesn't exist" };
    }

    if (foundJob && foundJob.userId !== userId) {
      return { success: false, message: "You are not allowed to do this action" };
    }

    await Job.deleteOne({ _id: id });
    return { success: true, message: "Job successfully deleted" };
  } catch (error) {
    return { success: false, message: "An error occured. Try again later." };
  }
}

export async function httpGetJobs() {
  try {
    const jobs = await Job.find();
    return jobs;
  } catch (error) {
    return { success: false, message: "An error has occured. Try again later." };
  }
}

export async function httpGetJob(id: string) {
  try {
    const job = await Job.findOne({ _id: id });

    if (!job) {
      return { success: false, message: "This job doesn't exist" };
    }

    return { success: true, job };
  } catch (error) {
    return { success: false, message: "An error has occured. Try again later." };
  }
}
