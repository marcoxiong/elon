import { ClaimCreateDto } from '../common/validation/dtoSchemas';
import prisma from '../config/prisma';

const getAllClaims = async () => {
  return await prisma.claim.findMany();
};

const createClaim = async (claimData: ClaimCreateDto) => {
  return prisma.claim.create({
    data: {
      ...claimData,
      transactionDate: new Date(claimData.transactionDate), // Ensure proper date handling
    },
  });
};

export const claimService = {
  getAllClaims,
  createClaim,
};