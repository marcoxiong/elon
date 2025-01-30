import { Request, Response, Router } from 'express';
import { storeFileUpload } from '../common/middleware/storeFileUpload';
import { validateRequestDto } from '../common/middleware/validateRequestDto';
import { ClaimCreateDtoSchema } from '../common/validation/dtoSchemas';
import { claimService } from '../service/claimService';

const claimController = Router();

claimController.post(
  '/',
  storeFileUpload.single('file'),
  validateRequestDto(ClaimCreateDtoSchema),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'Receipt file is required.' });
      return;
    }
    // Extract file path and form data
    const filePath = req.file.path;
    if (!filePath) {
      res.status(400).json({ error: 'File path is required.' });
      return;
    }

    const createdClaim = await claimService.createClaim({
      ...req.body,
      filePath,
    });
    res.status(201).json(createdClaim);
  }
);

claimController.get('/', async (_req: Request, res: Response) => {
  const claims = await claimService.getAllClaims();
  res.json(claims);
});

export default claimController;
