import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const newReview = {
    userId,
    propertyId,
    rating,
    comment,
  };

  const prisma = new PrismaClient();
  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;
