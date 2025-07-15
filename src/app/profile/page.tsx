import type { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { fetchSavedJobsCount } from "@/lib/fetch-saved-jobs-count";
import { fetchAppliedJobsCount } from "@/lib/fetch-applied-jobs-count";

// components
import Container from "@/components/shared/Container";
import ServerError from "@/components/errors/ServerError";
import Breadcrumb from "@/components/shared/BreadCrumb";
import ProfileDetails from "@/components/profile-details/ProfileDetails";

// utils
import { getUserSession } from "@/lib/getUserSession";

export const metadata: Metadata = {
  title: "Profile Details",
  description: "View your profile details.",
};

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Profile" }];

export default async function ProfilePage() {
  const { userId, name, email, image } = await getUserSession();

  if (!userId) redirect("/sign-in");

  let savedJobsLength: number | null = null;
  let appliedJobsLength: number | null = null;

  // Fetch saved and applied jobs count
  try {
    const [savedJobsCount, appliedJobsCount] = await Promise.all([
      fetchSavedJobsCount(userId),
      fetchAppliedJobsCount(userId),
    ]);

    savedJobsLength = savedJobsCount;
    appliedJobsLength = appliedJobsCount;
  } catch (error) {
    console.error("❌ Failed to fetch saved or applied jobs count:", error);
    return <ServerError />;
  }

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      <main role="main">
        <section className="w-full" aria-labelledby="profile-details">
          <h2 id="profile-details" className="sr-only">
            Profile Details
          </h2>
          <ProfileDetails
            userId={userId}
            image={image}
            name={name}
            email={email}
            savedJobsLength={savedJobsLength}
            appliedJobsLength={appliedJobsLength}
          />
        </section>
      </main>
    </Container>
  );
}
