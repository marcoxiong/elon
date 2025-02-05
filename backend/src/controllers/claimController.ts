import { Request, Response, Router } from 'express';
import storeFileUpload from '../common/middlewares/storeFileUpload';
import validateRequestDto from '../common/middlewares/validateRequestDto';
import { ClaimCreateDtoSchema } from '../common/validation/dtoSchemas';
import claimService from '../services/claimService';
import ocrService from '../services/ocrService';

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

    // const { userId, amount, transactionDate, subcategoryId, description } = req.body;
    const fileText = await ocrService.extract(req.file.path);
    const createdClaim = await claimService.createClaim({
      ...req.body,
      filePath,
    });
    res.status(201).json({ claim: createdClaim, ocrExtractedText: fileText });
  }
);

claimController.get('/', async (_req: Request, res: Response) => {
  const claims = await claimService.getAllClaims();
  res.json(claims);
});

export default claimController;
