import Joi from 'joi';

const userSchema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string()
        .regex(/^(?=.*?[A-Za-z])(?=.*?[0-9]).*$/)
        .required(),
    age: Joi.number()
        .min(4)
        .max(130)
        .required()
});

export default userSchema;
