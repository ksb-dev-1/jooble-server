import { auth } from "@/auth";

export default async function getUserSession() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const { user } = session;

  return {
    id: user.id,
    name: user.name || null,
    email: user.email || null,
    image: user.image || null,
  };
}
