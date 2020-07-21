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
    let validationErrors = validateInput(
      ["firstName", "lastName", "emailAddress", "password"],
      req.body
    );
    // check if email address has been used already
    const existingUser = await User.findOne({
      where: {
        emailAddress: req.body.emailAddress,
      },
    });
    console.log("existingUser", existingUser);
    if (existingUser) {
      validationErrors.push(
        "A user account already exists with this email. Do you want to <b>sign in?</b>"
      );
    }

    // if no validation errors
    if (validationErrors.length === 0) {
      // hash the password
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;

      try {
        // create the user
        await User.create(req.body);
        res.status(201).end();
      } catch (e) {
        console.log("YO!", e.errors);
      }
    } else {
      //validation errors were found
      console.log(validationErrors);
      console.log(req.body.firstName);
      res.status(400).json({
        message: "Missing information to create a new user",
        errors: validationErrors,
      });
    }
  })
);

module.exports = router;
