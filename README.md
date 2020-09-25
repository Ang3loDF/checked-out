# CheckedOut

## Getting started
Requirements:
 - Node.js
 - A MongoDB server running somewhere
 
To get the application running locally, you have to:
 - Clone this repo
 -  `npm install` to install the dependencies
 - run the front-end development server with `npm start`
 - run the back-end APIs:
   - set the environment variable `DATABASE_URL` to the URL of your MongoDB database.
   - `node ./backend/app.js` to run the backend server (port 3001)
 
## Functionality overview
This is a simple portfolio project. It's a cloud To-Do list, where you can create a list and add items to it. The list will be saved in the database. Note that in the current version it cannot be publicly deployed as the lists would be public and not personal, so privacy and security would not be effective.

## Authors
 - [Ang3loDF](https://github.com/Ang3loDF) - Angelo Di Fuccia
