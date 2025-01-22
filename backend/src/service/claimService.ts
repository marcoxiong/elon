import prisma from '../config/prisma';

export interface Claim {
  userId: string;
  amount: number;
}

export const getClaims = async () => {
  return await prisma.claim.findMany();
};

export const createClaim = async (claim: Claim) => {
  return await prisma.claim.create({ data: claim });
};
