# wills-task-manager-api
A Node.js based API for creating users and tasks related to said users. Made with guidance from Andrew Mead's "The Complete Node.js Developer Course". Excellent course, would recommend.

https://wills-nodejs-task-manager.herokuapp.com/

## HOW DOES IT WORK?
This app is entirely made up of Node.js and an extensive use of about a dozen npm packages. There is no frontend to project, this is purely a backend project but the API is available to use through heroku using the link above. The app uses Mongo DB for the database which is NoSQL, and uses Mongoose in order to gain access to it's array of amazing features. Express is being used for handeling routers and routes. There is also a middleware that is for creating JSON Web Tokens that get associated to a person's account and is used for authenticating the use of the various API endpoints. Theres also a sendgrid package installed that sends welcome and farewell emails to accounts created and deleted.

Jest is installed so that test suites can be created and evaluated.

Since theres no frontend that utilizes the API, I recommend using Postman to test the API yourself and see how it functions.

The app uses environment variables so don't forget to set those up if you are setting it up locally or on another platform like heroku.