"use server";

import { auth } from "@/auth";

export async function getUserSession() {
  const session = await auth();
  const userId = session?.user.id;
  const name = session?.user.name;
  const email = session?.user.email;
  const image = session?.user.image;

  return { userId, name, email, image };
}
