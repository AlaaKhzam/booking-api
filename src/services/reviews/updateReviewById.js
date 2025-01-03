import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.updateMany({
    where: { id },
    data: updatedReview,
  });

  return review.count > 0 ? id : null;
};

export default updateReviewById;
