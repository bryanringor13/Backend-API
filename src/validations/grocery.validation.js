import Joi from 'joi'

const create = {
    body: Joi.object().keys({
        name: Joi.string()
        .required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
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
        id: Joi.string()
          .required(),
        name: Joi.string(),
        category: Joi.string(),
        price: Joi.number()
    })
}

const deleteInfo = {
    body: Joi.object().keys({
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