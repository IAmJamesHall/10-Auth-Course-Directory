/**
 * try/catch wrapper for asynchronous functinos
 * @param {function} cb callback
 */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
}

/**
 * check that all required keys are present in the input object
 * @param {list} requiredValues
 * @param {object} input req.body, as received from the (post/put) request
 * @return {list} all validation errors, if any
 */
function validateInput(requiredValues, input) {
  const errors = [];
  requiredValues.forEach((element, i) => {
    if (!input[requiredValues[i]]) {
      errors.push(`'${requiredValues[i]}' field cannot be blank.`);
    }
  });
  return errors;
}

const { User } = require("../models").sequelize.models;
const bcrypt = require("bcryptjs");
function authenticateUser() {
  return async (req, res, next) => {
    const auth = require("basic-auth");
    const authUser = auth(req);
    console.log("authUser: ", authUser);
    // normalize attributes
    if (authUser) {
      authUser.emailAddress = authUser.name;
      authUser.password = authUser.pass;
      // check if email address is present in auth headers
      if (authUser.emailAddress) {
        // if so, look for the User record w/ that email address
        const foundUser = await User.findOne({
          where: {
            emailAddress: authUser.emailAddress,
          },
        });

        // if User record found
        if (foundUser) {
          // compare given password w/ stored hash
          await bcrypt.compare(
            authUser.password,
            foundUser.password,
            (err, result) => {
              if (result) {
                // if password is correct
                res.locals.user = {
                  emailAddress: foundUser.emailAddress,
                  userId: foundUser.id,
                  firstName: foundUser.firstName,
                  lastName: foundUser.lastName,
                };
                next();
              } else {
                //password is incorrect
                res.status(401).end();
              }
            }
          );
        } else {
          //user was not found
          res.status(401).end();
        }
      } else {
        //email address not present in auth headers
        res.locals.user = false;
        next();
      }
    } else {
      //auth headers not present
      res.status(401).end();
    }
  };
}
exports.asyncHandler = asyncHandler;
exports.validateInput = validateInput;
exports.authenticateUser = authenticateUser;
