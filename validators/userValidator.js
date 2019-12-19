const { celebrate, Joi } = require('celebrate');

module.exports = {
  register: celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .required(),

      username: Joi.string()
        .min(2)
        .required(),

      email: Joi.string()
        .email()
        .required(),

      password: Joi.string()
        .min(6)
        .required()
    })
  }),

  login: celebrate({
    body: Joi.object().keys({
      username: Joi.string()
        .min(2)
        .required(),

      password: Joi.string()
        .min(6)
        .required()
    })
  })
};
