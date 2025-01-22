import { Request, Response } from 'express';
import * as claimService from '../service/claimService';

export const getAllClaims = async (req: Request, res: Response) => {
  const claims = await claimService.getClaims();
  res.status(200).json(claims);
};

export const createClaim = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const newClaim = await claimService.createClaim({ userId, amount });
  res.status(201).json(newClaim);
};
