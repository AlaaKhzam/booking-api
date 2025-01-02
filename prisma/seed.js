import { PrismaClient } from "@prisma/client";
import userData from "../src/data/users.json" with { type: "json" };
import hostData from "../src/data/hosts.json" with { type: "json" };
import propertyData from "../src/data/properties.json" with { type: "json" };
import amenityData from "../src/data/amenities.json" with { type: "json" };
import bookingData from "../src/data/bookings.json" with { type: "json" };
import reviewData from "../src/data/reviews.json" with { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  try {
    const { users } = userData;
    const { hosts } = hostData;
    const { properties } = propertyData;
    const { amenities } = amenityData;
    const { bookings } = bookingData;
    const { reviews } = reviewData;

    for (const user of users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
    }

    for (const host of hosts) {
      await prisma.host.upsert({
        where: { id: host.id },
        update: {},
        create: host,
      });
    }

    for (const property of properties) {
      await prisma.property.upsert({
        where: { id: property.id },
        update: {},
        create: {
          id: property.id,
          title: property.title,
          description: property.description,
          location: property.location,
          pricePerNight: property.pricePerNight,
          bedroomCount: property.bedroomCount,
          bathRoomCount: property.bathRoomCount,
          maxGuestCount: property.maxGuestCount,
          rating: property.rating,
          host: {
            connect: { id: property.hostId }, 
          },
          amenities: {
            connect: (property.amenityIds || []).map((id) => ({ id })), 
          },
        },
      });
    }

    for (const booking of bookings) {
      await prisma.booking.upsert({
        where: { id: booking.id },
        update: {},
        create: {
          id: booking.id,
          checkinDate: booking.checkinDate,
          checkoutDate: booking.checkoutDate,
          numberOfGuests: booking.numberOfGuests,
          totalPrice: booking.totalPrice,
          bookingStatus: booking.bookingStatus,
          user: {
            connect: { id: booking.userId }, 
          },
          property: {
            connect: { id: booking.propertyId }, 
          },
        },
      });
    }

    for (const review of reviews) {
      await prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: {
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          user: {
            connect: { id: review.userId }, 
          },
          property: {
            connect: { id: review.propertyId },
          },
        },
      });
    }

    for (const amenity of amenities) {
      await prisma.amenity.upsert({
        where: { id: amenity.id },
        update: {},
        create: amenity,
      });
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
