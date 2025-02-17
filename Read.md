- create repo
- Initiate the repository
- node_modules, package.json, package-lock.json
- install express
- create server
- listen to port 3000
- write request handlers
- install nodenom
- what are dependencies
- use of -g while npm install
- difference btwn ~ and ^
- initalize git
- .gitignore
- create remote repository on github
- push all code to remote origin
- play with routes and extensions ex. /hello, /hello/2
- install postman app and make a worksapace and collection
- write logic to GET, POST, PATCH, PUT
- explore routing , use of ?, +, (), \* in routes
- use of regex in routes /a/, /.\*fly$/
- Reading the query params in the routes
- reading dynamic routes

- handling multiple route handlers - play with code
- next()
- next function and error along with res.send()
- what is middleware? why do we need it?
- How express JS basically handles requests behind the scenes.
- diff app.use & app.all
- write dummy auth middleware for admin
- write dummy auth middleware for user, except /user/login
- error handling using app.use
- app.use("/", (err, req, res, next) => {
  if (err) {
  //Log your error
  res.status(500).send("Something Went wrong!");
  }
  }); // always use at last // order matters!

- install mongoose library
- connect your application to DB - "Connection-url"/devTinder
- call connectDB fun and connect to database before starting application on 3000

- create user schema and model
- create /signup API to add data to db
- push some document using API
- jsObject vs JSON
- add the express.json middleware to your app
- make post call to read dynamic req body and save in db
- User.findOne with duplicate records - it will return older data.(cannot be sure)
- API- Get user by email
- API - feed API - Get/ feed - get all the users from the database.
- create a delete user API
- Differencec betn patch and put
- API- update user
- eplore the mongoose Documentation for Model Methods
- what are options in model.findOneAnd Update
- update user with email ID

- explore schema type options from the documentation
- add required, unique, lowercase, min, minlenght, trim
- add default
- create custom validate function for geder
- Improve the db schema- PUT all appropriate validations on each field in schema
- add timestamp to the userschema
