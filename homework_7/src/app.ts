import express from "express";
import load from "./loaders/index";
import log from "./utils/winston";

const startServer = async (): Promise<void> => {
  const app = express();
  app.set("port", process.env.PORT || 3000);

  await load(app);

  app.listen(app.get("port"), () => {
    log.info(
      "App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    log.info("Press CTRL-C to stop!\n");
  });
};

startServer();
