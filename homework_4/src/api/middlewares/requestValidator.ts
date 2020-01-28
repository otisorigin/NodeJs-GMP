import Joi from "joi";
import HttpException from "../../util/exceptions/HttpException";
import { Request, Response, NextFunction } from "express";

const validator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");
      console.log("error", message);
      next(new HttpException(message, 400));
    }
  };
};

export default validator;
