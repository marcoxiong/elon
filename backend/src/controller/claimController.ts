import { Request, Response } from 'express';
import { getClaims, addClaim } from '../service/claimService';

export const getAllClaims = async (req: Request, res: Response) => {
  const claims = await getClaims();
  res.status(200).json(claims);
};

export const createClaim = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const newClaim = await addClaim({ userId, amount });
  res.status(201).json(newClaim);
  // try {
    
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to create claim' });
  // }
};
