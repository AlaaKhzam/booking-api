import { PrismaClient } from "@prisma/client";

const getUserByQuery = async ({ username, email }) => {
  const prisma = new PrismaClient();

  let user = null;

  if (username) {
    user = await prisma.user.findUnique({
      where: { username },
    });
  } else if (email) {
    user = await prisma.user.findMany({
      where: { email },
    });
  }

  return user;
};

export default getUserByQuery;
