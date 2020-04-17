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
 */
const userSignUp = async (form) => {
  await axios
    .post("http://localhost:5000/api/users", { ...form })
    .then((response) => {
      console.log("form: ", form);
      console.log("response: ", response);
      this.setState({
        user: {
          authenticated: true,
          emailAddress: form.emailAddress,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * authenticates user credentials with server
 * if favorable response, sets user in state & cookies
 * @param {object} form - user sign-in form
 */
const userSignIn = (form) => {
  const { emailAddress, password } = form;
  axios
    .get("http://localhost:5000/api/users", {
      headers: getAuthHeaders(emailAddress, password),
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("logging in: ", response);
        response.data.user.password = password;
        response.data.user.authenticated = true;
        this.setState({ user: response.data.user });

        cookies.set("emailAddress", emailAddress, { path: "/" });
        cookies.set("password", password, { path: "/" });
        return true;
      }
    })
    .catch((error) => {
      return false;
    });
};

function userSignOut() {
  this.setState({
    user: {
      authenticated: false,
    },
  });
}

export { getAuthHeaders, userSignUp, userSignIn, userSignOut };
