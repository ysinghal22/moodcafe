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
        price: Joi.Number().required(),
        quantity: Joi.Number().required()
    }
}

module.exports = {
    registerValidation,
    loginValidation,
    addBookValidation
}