import { PrismaClient } from "@prisma/client";

const getHosts = async () => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    select: {
      id: true,
      username: true,
      password: false,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    },
  });

  return hosts;
};

export default getHosts;
