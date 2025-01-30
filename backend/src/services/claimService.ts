import { ClaimCreateDto } from '../common/validation/dtoSchemas';
import prisma from '../infra/prisma';

const getAllClaims = async () => {
  return await prisma.claim.findMany();
};

const createClaim = async (claimCreateDto: ClaimCreateDto) => {
  return prisma.claim.create({
    data: {
      ...claimCreateDto,
      amount: parseFloat(claimCreateDto.amount),
      transactionDate: new Date(claimCreateDto.transactionDate),
    },
  });
};

export const claimService = {
  getAllClaims,
  createClaim,
};
