import React, { Component } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class chat extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: "", messagesEndRef: React.createRef() };
    this.handleChange = this.handleChange.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleChange(event) {
    this.setState({ msg: event.target.value });
  }

  handleMessage(event) {
    event.preventDefault();
    this.props.handleMessage(this.state.msg);
    this.setState({ msg: '' });
    this.state.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <Container id="chatRoom">
        <Row style={{ height: window.innerHeight }}>
          <Col
            md={5}
            id="chatRoomUsers"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Row>
              <p style={{ width: "100%" }}>
                <b>Connected Users:</b>
              </p>
              <ul className="list-group" style={{ width: "100%" }}>
                {this.props.users.map((element, i) => {
                  return (
                    <li className="list-group-item" key={i}>
                      {element}
                    </li>
                  );
                })}
              </ul>
            </Row>
            <Container>
              <Row>
                You can ask bot-share about a stock with '/stock=' and it will be
                consulted in https://stooq.com/{" "}
              </Row>
              <Row>/stock=aapl.us</Row>
              <Row>/stock=DELL.US</Row>
              <Row>/stock=AMZN.US</Row>
              <Row>/stock=NFLX.US</Row>
              <Row>/stock=DIS.US</Row>
            </Container>
            <Row>
              <Form id="messageForm" style={{ width: "100%" }}>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Type your message:</span>
                  </div>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={this.state.msg}
                    onChange={this.handleChange}
                    style={{ height: 100 }}
                  ></textarea>
                </div>
                <Button
                  style={{ width: "100%" }}
                  ctype="submit"
                  variant="primary"
                  onClick={this.handleMessage}
                >
                  {" "}
                  Send!{" "}
                </Button>
              </Form>
            </Row>
          </Col>
          <Col
            id="chat"
            md={7}
            style={{
              height: window.innerHeight,
              overflow: "scroll",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <ul className="list-group">
              <li className="list-group-item active" style={{ padding: 0 }}>
                <b>Messages:</b>
              </li>
              {this.props.msgs.length > 0
                ? this.props.msgs.map((element, i) => {
                    return (
                      <li
                        className={
                          element.username === "system message"
                            ? element.content.includes("joined")
                              ? "list-group-item list-group-item-success"
                              : element.content.includes("left")
                              ? "list-group-item list-group-item-danger"
                              : "list-group-item list-group-item-primary"
                            : element.username.includes("bot-share")
                            ? "list-group-item list-group-item-info"
                            : "list-group-item"
                        }
                        key={i}
                        style={{ display: "flex", padding: 0 }}
                      >
                        <label style={{ width: "30%" }}>
                          <b>|{element.username}|</b>
                          <label style={{ fontSize: "10px" }}>
                            {element.timestamp}
                          </label>
                        </label>
                        <label style={{ width: "70%" }}>
                          {element.content}
                        </label>
                      </li>
                    );
                  })
                : null}
            </ul>
            <div
              ref={this.state.messagesEndRef}
              style={{ paddingBottom: "70px" }}
            >
              <i>--Last line--</i>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default chat;
