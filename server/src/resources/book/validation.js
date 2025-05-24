const Joi = require("joi");

const STATUS_VALUES = ["open", "In progress", "closed"];

const newBookSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  author: Joi.string().min(5).max(150).required(),
  category: Joi.string().min(5).max(150).required(),
});

module.exports = { newBookSchema };
