import React from "react";
import socketIOClient from "socket.io-client";
import Login from "./views/login";
import Chat from "./views/chat";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4000",
      user: "",
      char: false,
      users: [],
      msgs: [],
      msg: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("update current users", users => this.setState({ users: users }));
    socket.on("new message", msg =>
      this.setState({ msgs: [...this.state.msgs, msg] })
    );
    socket.on("system message", msg =>
      this.setState({
        msgs: [...this.state.msgs, { username: "system message", content: msg }]
      })
    );
  }

  handleMessage(msg) {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    if (this.msg !== "") {
      socket.emit("send message", {
        content: msg,
        username: this.state.user,
        timestamp: new Date()
      });
    }
    console.log(Date.now());
  }
  handleSubmit(user) {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    // Special characters that are not accepted
    var forbiddenCharacters = /[<>!|/\\[\]{}()='?,.;.*+ºª^~´`]/;
    if (user !== "" && !forbiddenCharacters.test(user)) {
      socket.username = user;
      let msg = {
        content:
          "Welcome " +
          socket.username +
          "! To communicate with the other users, write your message and send it!",
        username: "system message"
      };

      socket.emit("new client username", socket.username);
      this.setState({ user: user });
      this.setState({ msgs: [...this.state.msgs, msg] });
      this.setState({ chat: true });
    } else {
      this.setState({ user: "" });
    }
  }
  render() {
    const { chat, users, msgs } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {!chat ? (
          <Login handleSubmit={this.handleSubmit} />
        ) : (
          <Chat handleMessage={this.handleMessage} users={users} msgs={msgs} />
        )}
      </div>
    );
  }
}

export default App;
