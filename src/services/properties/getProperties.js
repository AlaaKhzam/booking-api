import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    include: {
      amenities: true,
      bookings: true,
      reviews: true,
    },
  });

  return properties;
};

export default getProperties;
