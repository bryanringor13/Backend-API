import Joi from 'joi'

const create = {
    body: Joi.object().keys({
        name: Joi.string()
        .required(),
        category: Joi.string().required(),
        price: Joi.string().required(),
    })
}

const groceryAll = { }

const groceryInfo = { 
    params: Joi.object().keys({
      id: Joi.string()
        .required()
    })
}

const updateInfo = {
    body: Joi.object().keys({
        name: Joi.string(),
        category: Joi.string(),
        price: Joi.string()
    }),
    params: Joi.object().keys({
      id: Joi.string()
        .required()
    })
}

const deleteInfo = {
    params: Joi.object().keys({
      id: Joi.string()
        .required()
    })
}

export default {
    create,
    groceryAll,
    groceryInfo,
    updateInfo,
    deleteInfo
}