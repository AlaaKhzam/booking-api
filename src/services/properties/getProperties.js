import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany();

  return properties;
};

export default getProperties;
