import express from "express";
import runLoaders from "./loaders/index";
import log from "./loaders/winston";

const app = express();
app.set("port", process.env.PORT || 3000);
runLoaders(app);

app.listen(app.get("port"), () => {
  log.info(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  log.info("Press CTRL-C to stop!\n");
});

export default app;
