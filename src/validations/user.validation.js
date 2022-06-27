import Joi from 'joi'

const login = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string().required()
  })
}

const register = {
  body: Joi.object().keys({
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 }),
    password: Joi.string()
        .required(),
    permissionLevel: Joi.number()
        .strict()
        .integer()
        .required().valid(1,2),
  })
}

const userInfo = { }

const updateInfo = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string()
  })
}

export default {
  login,
  register,
  userInfo,
  updateInfo
}