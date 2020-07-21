## TeamTreehouse Full Stack React Project

I built a front-end to manage and utilize a previous API I had built. The front-end provides the functionality to:

- sign up and authenticate users
- create courses
- update courses
- delete courses

I built off of HTML mockups in building this app.

### Extra Credit

- user friendly error messages
  - I built these error components
    - NotFound
    - UnhandledError
    - Forbidden
- persistent user crednetials through the use of an HTTP cookie
- redirect the user to their attempted page after successfully logging in
  - for example, if they try to create a course while logged out, they will be redirected to the login screen. After they login, they will be taken back to the create course screen.

## Directions to Run

This repository contains two folders: `api`, and `client`, and assumes that you have a recent version of node and npm installed.

Open the api folder in your terminal of choice and run `npm install`. Then run `npm run devstart`. This will open the API using nodemon on `localhost:5000`.

In `client/App.js` around line 36, make sure that `serverLocation` is set to `http://localhost:5000`.

While that terminal is still open, go to another terminal and run `npm install` in the `client` folder. When that finishes, run `npm start` in the same folder. This will start the React client on `localhost:3000`. Navigate to that url to run the app.
