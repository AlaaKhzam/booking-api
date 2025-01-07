import { PrismaClient } from "@prisma/client";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  // Check if the user already exists by username
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new Error("A user with this username already exists.");
  }

  // Create new user if username is unique
  const newUser = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
  };

  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;
