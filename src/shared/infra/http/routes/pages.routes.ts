import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { DashboardController } from '@modules/pages/useCase/dashboard/DashboardController';

const pageRouter = Router();

const dashboardController = new DashboardController();

pageRouter.get('/', ensureAuthenticate, dashboardController.handle);


export { pageRouter }