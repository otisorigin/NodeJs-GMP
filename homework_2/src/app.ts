import express from "express";

// Create Express server
const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", ( req, res ) => {
    res.send( "Hello world!!!!" );
} );

export default app;