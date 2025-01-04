import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHostByQuery = async (name) => {
  return await prisma.host.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export default getHostByQuery;
