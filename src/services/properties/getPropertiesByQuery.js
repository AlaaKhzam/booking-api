import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertiesByQuery = async (filters) => {
  const { location, pricePerNight, amenities } = filters;

  // Build query conditions dynamically
  const queryConditions = {};

  if (location) {
    queryConditions.location = {
      contains: location,
    };
  }

  if (pricePerNight && !isNaN(parseFloat(pricePerNight))) {
    queryConditions.pricePerNight = {
      equals: parseFloat(pricePerNight),
    };
  }

  // Handle filtering by amenities
  const amenitiesCondition = amenities
    ? {
        some: {
          name: {
            in: Array.isArray(amenities) ? amenities : [amenities],
          },
        },
      }
    : undefined;

  // Fetch filtered properties with relations
  const properties = await prisma.property.findMany({
    where: {
      ...queryConditions,
      ...(amenitiesCondition && { amenities: amenitiesCondition }),
    },
    include: {
      amenities: true,
    },
  });

  return properties;
};

export default getPropertiesByQuery;
