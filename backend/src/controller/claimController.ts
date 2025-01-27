import { Request, Response, Router } from 'express';
import { validateRequestDto } from '../common/middleware/validateRequestDto';
import { ClaimCreateDtoSchema } from '../common/validation/dtoSchemas';
import { claimService } from '../service/claimService';

const claimController = Router();

claimController.post(
  '/',
  validateRequestDto(ClaimCreateDtoSchema),
  async (req: Request, res: Response) => {
    const createdClaim = await claimService.createClaim(req.body);
    res.status(201).json(createdClaim);
  }
);

claimController.get('/', async (_req: Request, res: Response) => {
  const claims = await claimService.getAllClaims();
  res.json(claims);
});

export default claimController;
