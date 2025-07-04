import { PrismaClient } from "@prisma/client";
import { placeholderJobs } from "./jobs.js";

const prisma = new PrismaClient();

async function insertJobs() {
  try {
    for (const job of placeholderJobs) {
      // Ensure all skills are lowercase
      const lowercasedSkills = job.skills.map((skill) => skill.toLowerCase());

      // Create job entry with the transformed skills array
      await prisma.job.create({
        data: {
          ...job,
          skills: lowercasedSkills, // Insert the modified skills
        },
      });
    }
    console.log("Jobs inserted successfully.");
  } catch (error) {
    console.error("Error inserting jobs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertJobs();
