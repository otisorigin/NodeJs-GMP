import express from "express";
import bodyParser from "body-parser";

import * as userController from "./controllers/user";

// Create Express server
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set("port", process.env.PORT || 3000);

app.get("/users/", userController.findAllUsers);
app.get("/users/:id", userController.findUser);
app.post("/users/", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

export default app;
