import Joi from 'joi'

const create = {
    body: Joi.object().keys({
        groceryId: Joi.string()
        .required(),
        userId: Joi.string().required(),
        orderName: Joi.string().required(),
        price: Joi.number().required(),
    })
}

const orderInfo = { 
    body: Joi.object().keys({
        userId: Joi.string()
            .required()
    })
}

export default {
    create,
    orderInfo
}