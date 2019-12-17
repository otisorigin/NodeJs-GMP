import express from "express";
import usersData from "../data/users.json";
import User from "./model/user";

// Create Express server
const app = express();

app.set("port", process.env.PORT || 3000);

const users = usersData.map((user) => new User(user.id, user.login, user.password, user.age));

app.get("/", ( req, res ) => {
    res.send( "Hello world!" );
    console.log(users);
} );

export default app;