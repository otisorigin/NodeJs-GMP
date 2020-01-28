import bodyParser from "body-parser";
import errorMiddleware from "../api/middlewares/errorHandler";
import controllers from "../api/controllers";

const expressLoader = (app: any) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api", controllers);
  app.use(errorMiddleware);
};

export default expressLoader;
