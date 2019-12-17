import express from "express";
import collection from "./collection";

// Create Express server
const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", ( req, res ) => {
    res.send( JSON.stringify(collection[0], null, ' ') );
} );

export default app;