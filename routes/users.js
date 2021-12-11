const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const { validateRequest } = require("./utils");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    validateRequest(req, res);
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = createNewUser(name, email, password);
      user.password = await encryptUserPassword(password);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

const createNewUser = (name, email, password) => {
  return new User({
    name,
    email,
    password,
  });
};

const encryptUserPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const userPassword = await bcrypt.hash(password, salt);

  return userPassword;
};

module.exports = router;
