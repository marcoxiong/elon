import { Router } from 'express';
import { getAllClaims, createClaim } from '../controller/claimController';

const router = Router();

router.get('/', getAllClaims);
router.post('/', createClaim);

export default router;
