"use server";

import { redirect } from "next/navigation";

export async function clearFiltersServerAction(): Promise<void> {
  redirect("/jobs?page=1");
}
