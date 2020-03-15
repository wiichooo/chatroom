# chatroom

The application allows multiple users to talk to each other in the chatroom. <br/>
A specific command allows users to consult stock quotes from a specific URL.

### Tech
This project uses NodeJS in the server side and ReactJS in the client side.<br/>
It uses socket.io to allow communication.<br/>
It uses CSVtoJSON to receive and parse the CSV file that the stock website provides.<br/>
To use:
**Run the server side and the client side in different Terminals sessions.**

### Server Side
Location: `/server/` <br/>
To start the server:
```sh
$ npm install
$ node server.js
```
Runs the server in the port **4000** [http://localhost:4000](http://localhost:4000)

### Client Side
Location: `/client/`<br/>
To start the client:
```sh
$ npm install
$ npm start
```
Runs the app in the development mode.<br/>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build the app and serve it:<br/>
Builds the app for production to the `build` folder.<br/>
It correctly bundles React in production mode and optimizes the build for the best performance.
```sh
$ npm run build
$ serve -s build
```

### Tests
Location: `/client/`<br/>
There are four tests for the client side. (React components)<br/>
And two tests for the main server side Socket.io functions. <br/>
To run tests:
```sh
$ npm test
```

##### TODO:
- ~~Set max messages to view to 50~~
- ~~Change the stock bot call to /stock=~~
