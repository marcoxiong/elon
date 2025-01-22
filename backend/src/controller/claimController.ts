import { Request, Response, Router } from 'express';
import { validateRequestDto } from '../common/middleware/validateRequestDto';
import * as claimService from '../service/claimService';
import { ClaimCreateDtoSchema } from '../common/validation/dtoSchemas';

const router = Router();

router.post('/',
  validateRequestDto(ClaimCreateDtoSchema), // Middleware to validate the request
  async (req: Request, res: Response) => {
    const createdClaim = await claimService.createClaim(req.body);
    res.status(201).json(createdClaim);
  }
);

router.get('/', 
  async (_req: Request, res: Response) => {
    const claims = await claimService.getAllClaims();
    res.json(claims);
});

export default router;