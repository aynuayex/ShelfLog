const logger = require("../config/logger");
const {
  newBookSchema,
  changeBookSchema,
} = require("../resources/book/validation");
const {
  newUserSchema,
  loginUserSchema,
} = require("../resources/users/validation");

const validateUser = (req, res, next) => {
  const schema = req.path === "/register" ? newUserSchema : loginUserSchema;

  const { error } = schema.validate(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const validateBook = (req, res, next) => {
  const schema =
    req.method == "PUT"
      ? changeBookSchema
      : newBookSchema;
  const { error } = schema.validate(req.body);
  if (error) {
    logger.info(`method: ${req.method}, role: ${req.user.role}`);
    logger.error(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = { validateUser, validateBook };
