import { Router } from 'express';

import { userRouter } from './users.routes';
import { pageRouter } from './pages.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/pages', pageRouter);

export { router }