import Joi from "joi";

const userSchema = Joi.object().keys({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().required()
});

export default userSchema;
