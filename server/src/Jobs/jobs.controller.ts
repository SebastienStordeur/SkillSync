import Job from "./jobs.model";
import { spawn } from "child_process";
import path from "path";

export async function httpCreateJob(job: any, userId: string) {
  const {
    title,
    description,
    company,
    salary,
    location,
    extra: { remote, type, vacations },
  } = job;

  console.log(job);
  const newJob = new Job({
    title,
    description,
    company,
    salary,
    location,
    extra: { remote, type, vacations },
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
    /* console.log(jobs); */
    return jobs;
  } catch (error) {
    return { success: false, message: "An error has occured. Try again later." };
  }
}

async function getJobsFromPython(jsonJob: any) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../lib/JobRecommender.py");
    const pythonProcess = spawn("python", [scriptPath, jsonJob]);

    pythonProcess.stdout.on("data", (data) => {
      const allJobs = JSON.parse(data.toString());
      resolve(allJobs);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      reject({ success: false, message: "An error has occured. Try again later." });
    });
  });
}

export async function httpGetJob(id: string) {
  try {
    const job = await Job.findOne({ _id: id });

    if (!job) {
      return { success: false, message: "This job doesn't exist" };
    }

    const jsonJob = JSON.stringify(job);
    // Get jobs from Python script
    const recommandations = (await getJobsFromPython(jsonJob)) as any[];

    const recommended_jobs: any[] = [];

    for (const recommended_job of recommandations) {
      const job = await Job.findOne({ _id: recommended_job });
      recommended_jobs.push(job);
    }

    console.log("ARRAY OF RECOMMENDATIONS", recommended_jobs);

    // Perform any additional operations on allJobs

    return { success: true, message: "", job, recommendations: recommended_jobs };
  } catch (error) {
    return { success: false, message: "An error has occured. Try again later." };
  }
}
