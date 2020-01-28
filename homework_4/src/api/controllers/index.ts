import { Router } from "express";

import userController from "./userController";

const router: Router = Router();

// Connect controllers
router.use("/users", userController);

export default router;