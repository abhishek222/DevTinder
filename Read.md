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

- add API level validation on Patch request & signup Post API
- Data Sanitizing - add APi validation for each field
- Install validator
- explore validator library functions and use validator func for password, email
- never trust req.body

- validate data in signup API
- install bcrypt package
- create Passwordhash using bcript.hash & save the user is encrupted password.
- create login API
- compare password and throw error

- install cookie-parser
- just send dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken.
- in login API, after email and password validation, create JWT token and send it to user in cookie
- read the cookie inside your profile API and find logged in user.
- userAuth middleware
- Add the userAuth middle ware in profile and a new sendConnectionRequest API
- set the expiry of JWT token and cookie to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to compare password

- Explore tinder APIs
- create list of all apis
- group multiple routes under respective routers
- Read documentation for express.Router
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- import authRouter, profileRouter, requestRouter in app.js
- Create Post /logout API
- Create patch /profile/edit
- create patch /profile/updatePassword API
- make you validate all data in every POST, PATCH API

- create connection request schema
- send connection request API
- proper validation on connection request
- $or query $and query in mongoose
- schema.pre()
- read more about indexes
- why do we need indexes?
- what is advaantage of indexes? and disadvantage?
- Read this article about Compount Index
- always think about corner cases

- write code with proper validations for /request/review/:status/:userId
- thought process - POST vs GET
- Read about ref and populate
- create GET /user/request/received

- Logic for GET /feed API
- Explore the $nin, $ne, $or, $and query operators

- Pagination

Notes:

- /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
- /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
- /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

- .skip() & .limit()
- skip = (page - 1) \* limit
