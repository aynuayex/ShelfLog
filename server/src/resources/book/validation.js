const Joi = require("joi");

const STATUS_VALUES = ["open", "In progress", "closed"];

const newBookSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  author: Joi.string().min(5).max(150).required(),
  category: Joi.string().min(5).max(150).required(),
});

const changeBookSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  author: Joi.string().min(5).max(150).required(),
  category: Joi.string().min(5).max(150).required(),
  note: Joi.string().min(5).max(150).required(),
  status: Joi.string().valid(...STATUS_VALUES).required(),
});

module.exports = { newBookSchema, changeBookSchema };
