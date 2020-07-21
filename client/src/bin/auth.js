import base64 from "base-64";
import axios from "axios";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

/**
 * helper function to create the auth headers for use in axios requests
 * @param {string} emailAddress
 * @param {string} password
 */
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
const authSignUp = async (form, serverLocation) => {
  try {
    await axios.post(`${serverLocation}/api/users`, {
      ...form,
    });
    return {
      user: {
        authenticated: true,
        emailAddress: form.emailAddress,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      },
    };
  } catch (e) {
    return {
      status: 400,
      errors: e.response.data.errors,
    };
  }
};

/**
 * authenticates user credentials with server
 * if favorable response, sets user in state & cookies
 * @param {object} form - user sign-in form
 * @param {string} serverLocation - url to access the server
 * @return {object} authenticated user
 */
const authSignIn = async (form, serverLocation) => {
  const { emailAddress, password } = form;
  try {
    const response = await axios.get(`${serverLocation}/api/users`, {
      headers: getAuthHeaders(emailAddress, password),
    });

    if (response.status === 200) {
      response.data.user.password = password;
      response.data.user.authenticated = true;
      return { user: response.data.user };
    }
  } catch (error) {
    return false;
  }
};

export { getAuthHeaders, authSignUp, authSignIn };
