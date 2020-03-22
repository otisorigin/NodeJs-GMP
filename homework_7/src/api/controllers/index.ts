import { Router } from 'express';

import userController from './userController';
import groupController from './groupController';
import authController from './authController';

const router: Router = Router();

// Connect controllers
router.use('/users', userController.route);
router.use('/groups', groupController.route);
router.use('/auth', authController);

export default router;
