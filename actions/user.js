"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        //Find If Industry Exists
        let industryInsight = await tx.industryInsights.findUnique({
          where: {
            industry: data.industry,
          },
        });
        //If industry does not exists, create it with default values - will replace it with ai later

        if (!industryInsight) {
          industryInsight = await tx.industryInsights.create({
            data: {
              industry: data.industry,
              salaryRanges: [],
              growthRate: 0,
              demandLevel: "MEDIUM",
              topSkills: [],
              marketOutlook: "NEUTRAL",
              keyTrends: [],
              recommendedSkills: [],
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // update user
        const updateUser = await tx.user.update({
          where: {
            id: user.id,
          },
          date: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updateUser, industryInsight };
      },
      {
        timeout: 10000,
      }
    );

    return result.user;
  } catch (error) {
    console.error("Error updating user and industry : ", error.message);
    throw new Error("Failed to Update Profile " + error.message);
  }
}

export async function getUserOnboardingStatus(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error Checking onboarding status : ", error.message);
    throw new Error("Failed to Check Onboarding Status");
  }
}
