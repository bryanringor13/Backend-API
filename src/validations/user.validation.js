import Joi from 'joi'

const token = {
  body: Joi.object().keys({
    token: Joi.string()
      .required()
  })
}

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

const deleteInfo = {
  body: Joi.object().keys({
    userId: Joi.string()
      .required(),
  })
}

const logout = { }


export default {
  token,
  login,
  register,
  userInfo,
  updateInfo,
  deleteInfo,
  logout
}