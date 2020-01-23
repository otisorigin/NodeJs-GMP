import express from "express";
import runLoaders from "./loaders/index";
import controllers from "./api/controllers";

const app = express();
app.set("port", process.env.PORT || 3001);

runLoaders(app);

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop!\n");
});

app.use("/api", controllers);

export default app;
