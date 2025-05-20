import { Router } from 'express';
import CollectionController from '@/controllers/v1/collection.controller';
import { createCollectionSchema } from '@/validations/v1/collection.validations';
import { validateRequest } from '@/middlewares/validate-request.middlewares';
import { authMiddleware } from '@/middlewares/auth.middlewares';

const router = Router();

router.post('/', authMiddleware, validateRequest(createCollectionSchema), CollectionController.create);

export default router;
