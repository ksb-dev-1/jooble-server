"use server";

import { redirect } from "next/navigation";

export async function clearFiltersServerAction() {
  redirect("/jobs?page=1");
}
