import { PrismaClient } from "@prisma/client";

// Fetch all users and their information, except password
const getUsers = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      password: false,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });

  return users;
};

export default getUsers;
