import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.deleteMany({
    where: { id },
  });

  return host.count > 0 ? id : null;
};

export default deleteHostById;
