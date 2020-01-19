import { Router } from "express";

import userController from "./user";

const router: Router = Router();

// Connect controllers
router.use("/users", userController);

export default router;