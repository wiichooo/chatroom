import React from "react";
import { render } from "@testing-library/react";
import Login from "./views/login";
import Chat from "./views/chat";
import io from "socket.io-client";

//Client Side Tests
describe("CLIENT SIDE test suit: Login and Chat Components", () => {
  test("renders login", () => {
    const { getByText } = render(<Login />);
    const linkElement = getByText(/Join!/);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders login", () => {
    const { getByText } = render(<Login />);
    const linkElement = getByText(/username/);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders chat", () => {
    const { getByText } = render(
      <Chat users={["a", "b"]} msgs={[{ content: "a", username: "b" }]} />
    );
    const linkElement = getByText(/Connected Users:/);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders chat", () => {
    const { getByText } = render(
      <Chat users={["a", "b"]} msgs={[{ content: "a", username: "b" }]} />
    );
    const linkElement = getByText(/stooq.com/);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders chat", () => {
    const { getByText } = render(
      <Chat users={["a", "b"]} msgs={[{ content: "a", username: "b" }]} />
    );
    const linkElement = getByText(/Messages/);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders chat", () => {
    const { getByText } = render(
      <Chat users={["a", "b"]} msgs={[{ content: "a", username: "b" }]} />
    );
    const linkElement = getByText(/Last line/);
    expect(linkElement).toBeInTheDocument();
  });
});

///Server Side Tests
const initSocket = () => {
  return new Promise((resolve, reject) => {
    // create socket for communication
    const socket = io("http://127.0.0.1:4000");

    // define event handler for sucessfull connection
    socket.on("connect", () => {
      console.log("connected");
      resolve(socket);
    });

    // if connection takes longer than 5 seconds throw error
    setTimeout(() => {
      reject(new Error("Failed to connect wihtin 5 seconds."));
    }, 5000);
  });
};

const destroySocket = socket => {
  return new Promise((resolve, reject) => {
    // check if socket connected
    if (socket.connected) {
      // disconnect socket
      console.info("disconnecting...");
      socket.disconnect();
      resolve(true);
    } else {
      // not connected
      console.log("no connection to break...");
      resolve(false);
    }
  });
};

describe("SERVER SIDE test suit: NewUsername and NewMesaage", () => {
  test("test: NewUsername", async () => {
    // create socket for communication
    const socketClient = await initSocket();
    // create new promise for server response
    const serverResponse = new Promise((resolve, reject) => {
      // define a handler for the test event
      socketClient.on("update current users", clientData => {
        //process data received from server
        const { username } = clientData;
        console.log("Server says: " + username);
        destroySocket(socketClient);
        resolve(clientData);
      });
      setTimeout(() => {
        reject(new Error("Failed to get reponse, connection timed out..."));
      }, 5000);
    });

    const serverData = {
      status: 200,
      username: "Fernando"
    };

    // emit event with data to server
    console.log("Emitting NEW CLIENT event");
    socketClient.emit("new client username", serverData);
    const res  = await serverResponse;
    const usernames = res.shift();
    // check the response data
    expect(usernames.status).toBe(200);
    expect(usernames.username).toBe("Fernando");
  });

  test("test: NewMessage", async () => {
    // create socket for communication
    const socketClient = await initSocket();
    // create new promise for server response
    const serverResponse = new Promise((resolve, reject) => {
      // define a handler for the test event
      socketClient.on("new message", clientData => {
        //process data received from server
        const { content } = clientData;
        console.log("Server says: " + content);
        destroySocket(socketClient);
        resolve(clientData);
      });
      setTimeout(() => {
        reject(new Error("Failed to get reponse, connection timed out..."));
      }, 5000);
    });

    const serverData = {
      content: "MSG CONTENT",
      status: 200,
      username: "Luis"
    };

    // emit event with data to server
    console.log("Emitting NEW MSG event");
    socketClient.emit("send message", serverData);
    const { status, content, username } = await serverResponse;
    // check the response data
    expect(status).toBe(200);
    expect(username).toBe("Luis");
    expect(content).toBe("MSG CONTENT");
  });
});
