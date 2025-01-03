import { PrismaClient } from "@prisma/client";

const getBookings = async () => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany();

  return bookings;
};

export default getBookings;
