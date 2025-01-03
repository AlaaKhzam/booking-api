import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.updateMany({
    where: { id },
    data: updatedProperty,
  });

  return property.count > 0 ? id : null;
};

export default updatePropertyById;
