# Divya, a food /  calorie tracking app built in reactJS.

## Features
3rd party authentication using Auth0.
User data managed in SQL database.
React based front-end.
Redux state management.
ChartJS dynamically displays daily macro info.

## Setup
Fork/clone and run npm install to to install dependencies.

The server and authentication require an env file. Create a .env at the root of the project.
### END values: 
```
SERVER_PORT=3333
CALLBACK_URL=http://localhost:3333/auth/callback
REACT_APP_LOGIN=http://localhost:3333/login
SUCCESS_REDIRECT=http://localhost:3000/#/medium
FAILURE_REDIRECT=http://localhost:3000/#/loginFailure

//These are private and cannot be shared for security reasons, must use your own.
SESSION_SECRET=(any secure, unpredicticble string will work)
DOMAIN=(auth0 provided domain)
CLIENT_ID=(auth0 provided client id)
CLIENT_SECRET=(auth0 provided client secret)


```
Run 'nodemon' in the terminal.  npm start. 
