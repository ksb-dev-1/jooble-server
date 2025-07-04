// "use server";

// import { redirect } from "next/navigation";

// export async function applyFiltersServerAction(formData: FormData) {
//   const search = formData.get("search")?.toString() || "";
//   const location = formData.get("location")?.toString() || "";
//   const jobType = formData.get("jobType")?.toString() || "";
//   const jobMode = formData.get("jobMode")?.toString() || "";

//   const searchParams = new URLSearchParams({ page: "1" });
//   if (search && search !== "") searchParams.append("search", search);
//   if (location && location !== "all") searchParams.append("location", location);
//   if (jobMode && jobMode !== "all") searchParams.append("jobMode", jobMode);
//   if (jobType && jobType !== "all") searchParams.append("jobType", jobType);

//   redirect(`/jobs?${searchParams.toString()}`);
// }

"use server";

import { redirect } from "next/navigation";

export async function applyFiltersServerAction(formData: FormData) {
  const search = formData.get("search")?.toString() || "";
  const locationRaw = formData.get("location")?.toString() || "";
  const jobTypeRaw = formData.get("jobType")?.toString() || "";
  const jobModeRaw = formData.get("jobMode")?.toString() || "";

  const searchParams = new URLSearchParams({ page: "1" });

  if (search.trim()) searchParams.append("search", search.trim());

  const locationList = locationRaw
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val && val.toLowerCase() !== "all");

  const jobTypeList = jobTypeRaw
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val && val.toLowerCase() !== "all");

  const jobModeList = jobModeRaw
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val && val.toLowerCase() !== "all");

  if (locationList.length > 0) {
    searchParams.append("location", locationList.join(","));
  }

  if (jobTypeList.length > 0) {
    searchParams.append("jobType", jobTypeList.join(","));
  }

  if (jobModeList.length > 0) {
    searchParams.append("jobMode", jobModeList.join(","));
  }

  redirect(`/jobs?${searchParams.toString()}`);
}
