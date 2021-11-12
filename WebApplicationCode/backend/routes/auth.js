const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("Joi");
// const Joi = require("../node_modules/joi");

const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findByEmail(req.body.email);
  if (!user) return res.status(400).send("Invalid username ");

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.userpassword
  );
  if (!validPassword) return res.status(400).send("Invalid  password");

  const { name, email, isadmin } = user;

  const token = User.generateAuthToken(name, email, isadmin);

  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
