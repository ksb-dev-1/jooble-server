import type { Metadata } from "next";
import { redirect } from "next/navigation";

// actions
import { fetchSavedJobsLengthServerAction } from "@/actions/fetch-saved-jobs-length-server-action";
import { fetchAppliedJobsLengthServerAction } from "@/actions/fetch-applied-jobs-length-server-action";

// components
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/shared/BreadCrumb";
import ProfileDetails from "@/components/profile-details/ProfileDetails";

// utils
import { getUserSession } from "@/lib/getUserSession";

export const metadata: Metadata = {
  title: "Profile",
};

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Profile" }];

export default async function ProfilePage() {
  const { userId, name, email, image } = await getUserSession();

  if (!userId) redirect("/sign-in");

  const savedJobsLength = await fetchSavedJobsLengthServerAction(userId);
  const appliedJobsLength = await fetchAppliedJobsLengthServerAction(userId);

  return (
    <Container>
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      <ProfileDetails
        userId={userId}
        image={image}
        name={name}
        email={email}
        savedJobsLength={savedJobsLength}
        appliedJobsLength={appliedJobsLength}
      />
    </Container>
  );
}
