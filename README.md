# chatroom

The application allows multiple users to talk to each other in the chatroom.
A specific command allows users to consult stock quotes from a specific URL.

### Tech
This project uses NodeJS in the server side and ReactJS in the client side.
It uses socket.io to allow communication.
It uses CSVtoJSON to receive and parse the CSV file that the stock website provides.
To use:
**Run the server side and the client side in different Terminals sessions.**

### Server Side
Location: `/server/` 
To start the server:
```sh
$ npm install
$ node server.js
```
Runs the server in the port **4000** [http://localhost:4000](http://localhost:4000)

### Client Side
Location: `/client/`
To start the client:
```sh
$ npm install
$ npm start
```
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build the app and serve it:
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
```sh
$ npm run build
$ serve -s build
```

### Tests
Location: `/client/`
There are four tests for the client side. (React components)
And two tests for the main server side Socket.io functions. 
To run tests:
```sh
$ npm test
```

##### TODO:
- Set max messages to view to 50
- Change the stock bot call to /stock=
