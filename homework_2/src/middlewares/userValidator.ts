import Joi from "joi";
import { Request, Response } from "express";

const validator = (schema: any) => {
  return (req: Request, res: Response, next: any) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");

      console.log("error", message);
      res.status(400).json({ error: message });
    }
  };
};

export default validator;
