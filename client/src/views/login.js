import React, { Component } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ user: event.target.value });
  }

  render() {
    return (
      <Container>
        <Row style={{ width: "100%", display: "flex" }}>
          <Col style={{ width: "30%" }}></Col>
          <Col style={{ width: "30%" }}>
            <Form id="login">
              <Form.Label id="loginMessage">
                <b>Enter your username to join!</b>
              </Form.Label>
              <Form.Control
                id="user"
                autoComplete="off"
                value={this.state.user}
                onChange={this.handleChange}
              />
              <Button
                style={{ width: "100%" }}
                type="submit"
                variant="primary"
                onClick={() => this.props.handleSubmit(this.state.user)}
              >
                Join!
              </Button>
            </Form>
          </Col>
          <Col style={{ width: "30%" }}></Col>
        </Row>
      </Container>
    );
  }
}

export default login;
