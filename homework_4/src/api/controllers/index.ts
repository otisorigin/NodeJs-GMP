import { Router } from "express";

import userController from "./userController";
import groupController from "./groupController";

const router: Router = Router();

// Connect controllers
router.use("/users", userController);
router.use("/groups", groupController);

export default router;