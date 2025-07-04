import { useSession } from "next-auth/react";

export const useCurrentUserSession = () => {
  const { data: session, status, update } = useSession();

  const userId = session?.user.id;
  const email = session?.user.email;
  const image = session?.user.image;

  return { userId, email, image, status, update };
};
