import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, updatedAmenity) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: updatedAmenity,
  });

  return amenity.count > 0 ? id : null;
};

export default updateAmenityById;
