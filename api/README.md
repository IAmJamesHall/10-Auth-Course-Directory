
# Full Stack JavaScript Techdegree v2 - REST API Project (Project #9)
## Description
In this project, I created a HTTP REST API for managing courses and users.

This API provides these endpoints: (assuming the server is running on `localhost:5000`)

### Courses
**Get a list of all courses**
```
$ curl http://localhost:5000/api/courses
```

**Get an individual course**
```
$ curl http://localhost:5000/api/courses/[course id]
```

**Create new course**

*must be authenticated to create a course*

```
$ curl --user [your email]:[your password] -d '{"title":"[your title]", "description":"[your description]"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/courses/[course id]
```
Fields:
- title (required)
- description (required)
- estimatedTime
- materialsNeeded

**Update a course**

*must be authenticated as the course's owner to update it*
```
$ curl --user [your email]:[your password] -d '{"title":"[your updated title]"}' -H "Content-Type: application/json" -X PUT http://localhost:5000/api/courses/[course id]
```
Fields: (any number of these fields can be used)
- userId
- title
- description
- estimatedTime
- materialsNeeded

**Delete a course**

*must be authenticated as the course's owner to delete it*
```
$ curl --user [your email]:[your password] -X DELETE http://localhost:5000/api/courses/[course id]
```

---
### Users
**Get currently authenticated user**
```
$ curl --user [your email]:[your password] http://localhost:5000/api/users
```

**Add a new user**
```
$ curl  -d '{"firstName":"[your first name]", "lastName":"[your last name]", "emailAddress":"[your email address]", "password":"[your password]"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/users
```
Fields: (all fields are required)
- firstName
- lastName
- emailAddress
- password


## Helper Files
The following helper files were created by Treehouse:

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install
```

Then, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

## Database Reset
To reset the database, run this command in the root directory
```
npm run seed
```
