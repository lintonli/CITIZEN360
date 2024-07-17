import Joi from "joi";
export const RegisterSchema = Joi.object({
  UNAME: Joi.string().required(),
  EMAIL: Joi.string().required().email(),
  UPASSWORD: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ),
    Rolename:Joi.string().required(),
});