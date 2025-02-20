import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookingByQuery = async (userId) => {
  return await prisma.booking.findMany({
    where: { userId },
  });
};

export default getBookingByQuery;
