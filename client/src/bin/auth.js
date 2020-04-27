import base64 from "base-64";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const getAuthHeaders = (emailAddress, password) => {
  return {
    Authorization: `Basic ${base64.encode(`${emailAddress}:${password}`)}`,
  };
};

/**
 * send credentials to the database to sign up a user
 * sets state with
 * @param {object} form - user sign-up form
 * @return {object} signed-up user
 */
const userSignUp = async (form) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users", {
      ...form,
    });
    console.log("form: ", form);
    console.log("response: ", response);
    return {
      user: {
        authenticated: true,
        emailAddress: form.emailAddress,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      },
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * authenticates user credentials with server
 * if favorable response, sets user in state & cookies
 * @param {object} form - user sign-in form
 * @return {object} authenticated user
 */
const userSignIn = async (form) => {
  const { emailAddress, password } = form;
  try {
    const response = await axios.get("http://localhost:5000/api/users", {
      headers: getAuthHeaders(emailAddress, password),
    });

    if (response.status === 200) {
      console.log("logging in: ", response);
      response.data.user.password = password;
      response.data.user.authenticated = true;
      return { user: response.data.user };
    }
  } catch (error) {
    console.log("Error in auth.js's userSignIn", error);
    return false;
  }
};

function userSignOut() {
  this.setState({
    user: {
      authenticated: false,
    },
  });
}

export { getAuthHeaders, userSignUp, userSignIn, userSignOut };