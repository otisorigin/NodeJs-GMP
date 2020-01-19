import bodyParser from "body-parser";

const expressLoader = (app : any) => {
  app.set("port", process.env.PORT || 3000);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

export default expressLoader;
