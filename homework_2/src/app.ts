import express from "express";
import bodyParser from "body-parser";
import validator from "./middlewares/requestValidator";
import userSchema from "./schemas/userSchema";

import userController from "./controllers/user";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

app.get("/users/", userController.findAllUsers);
app.get("/users/:id", userController.findUser);
app.post("/users/", validator(userSchema), userController.createUser);
app.put("/users/:id", validator(userSchema), userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

export default app;
