import express from "express";
import User from "./models/User";

import * as userController from "./controllers/user";

// Create Express server
const app = express();

app.set("port", process.env.PORT || 3000);
app.get("/users/", userController.getUsers);

export default app;
