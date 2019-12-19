const { celebrate, Joi } = require('celebrate');

module.exports = {
  submitPost: celebrate({
    body: Joi.object().keys({
      title: Joi.string()
        .min(2)
        .max(20)
        .required(),
      content: Joi.string()
        .min(2)
        .max(500)
        .required()
    })
  })
};
