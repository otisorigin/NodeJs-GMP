import bodyParser from "body-parser";

const expressLoader = (app : any) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

export default expressLoader;
