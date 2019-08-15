const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const validateUser = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, validateUser);
}

const loginValidation = (data) => {
    const validateUser = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, validateUser);
}

const addBookValidation = (data) => {
    const validateBook = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
    }
    return Joi.validate(data, validateBook);
}

module.exports = {
    registerValidation,
    loginValidation,
    addBookValidation
}