import Job from "./jobs.model";
import { spawn } from "child_process";

export async function httpCreateJob(job: any, userId: string) {
  const { title, description, company, salary, location, remote } = job;

  console.log(job);
  const newJob = new Job({
    title,
    description,
    company,
    salary,
    location,
    remote,
    userId,
  });

  //checking if required fields are here
  //validating fields
  await newJob.save();
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
    console.log(jobs);
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

    const jsonJob = JSON.stringify(job);
    //Recommandation system
    const pythonProcess = spawn("python", ["../lib/Recommandation.py", jsonJob]);

    pythonProcess.stdout.on("data", (data) => {
      const recommendations = JSON.parse(data.toString());
      console.log(recommendations);
    });

    return { success: true, job };
  } catch (error) {
    return { success: false, message: "An error has occured. Try again later." };
  }
}
