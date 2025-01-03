import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const newBooking = {
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
  };

  const prisma = new PrismaClient();
  const booking = await prisma.booking.create({
    data: newBooking,
  });

  return booking;
};

export default createBooking;
