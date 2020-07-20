const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { asyncHandler, validateInput, authenticateUser } = require("../util");

// DB Model
const { User } = require("../models").sequelize.models;

// GET the currently authenticated user
router.get(
  "/",
  authenticateUser(),
  asyncHandler(async (req, res) => {
    res.json({ user: res.locals.user });
  })
);

// POST a new user
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const validationErrors = validateInput(
      ["firstName", "lastName", "emailAddress", "password"],
      req.body
    );

    // if no validation errors
    if (validationErrors.length === 0) {
      // hash the password
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;

      // create the user
      await User.create(req.body);
      res.status(201).end();
    } else {
      //validation errors were found
      console.log(validationErrors);
      console.log(req.body.firstName);
      res
        .status(400)
        .json({
          message: "Missing information to create a new user",
          errors: validationErrors,
        });
    }
  })
);

module.exports = router;
