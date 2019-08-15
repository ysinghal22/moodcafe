const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const validateData = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, validateData);
}

const loginValidation = (data) => {
    const validateData = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, validateData);
}

const addBookValidation = (data) => {
    const validateData = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    }
    return Joi.validate(data, validateData);
}

const purchaseValidation = (data) => {
    const validateData = {
        book: Joi.string().required()
    }
    return Joi.validate(data, validateData);
}

module.exports = {
    registerValidation,
    loginValidation,
    addBookValidation,
    purchaseValidation
}