import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  // Check if the host already exists by username
  const existingHost = await prisma.host.findUnique({
    where: { username },
  });

  if (existingHost) {
    throw new Error("A host with this username already exists.");
  }

  // Create new host if username is unique
  const newHost = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  const host = await prisma.host.create({
    data: newHost,
  });

  return host;
};

export default createHost;
