const { celebrate, Joi } = require('celebrate');

module.exports = {
  submitComment: celebrate({
    body: Joi.object().keys({
      text: Joi.string()
        .min(2)
        .max(20)
        .required()
    })
  })
};
