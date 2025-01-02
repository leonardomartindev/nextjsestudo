import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import prisma from "./db";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  return { isAuth: true, userId: session.userId, userRole: session.userRole };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        userRole: true,
      },
    });
    return user;
  } catch (error) {
    console.log("Failed to fetch user:", error);
    return null;
  }
});
