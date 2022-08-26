import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import { login } from "./../redux/actions/auth";

import { connect, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const Register = ({ isLoading, errMsg = "" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch(login({ email, password }, navigate));
    }
  };

  return (
    <div className="loginForm">
      {errMsg ? (
        <Alert key={"danger"} variant={"danger"}>
          {errMsg}
        </Alert>
      ) : null}

      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Register</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="loginBtn"
          onClick={onSubmit}
        >
          Login
          {isLoading && <Spinner animation="border" />}
        </Button>
        <Form.Text className="text-muted">
          Don't have account, Register here.
        </Form.Text>

        <Button variant="primary" type="submit" className="loginBtn">
          Register
        </Button>
      </Form>
    </div>
  );
};

Register.prototypes = {
  isLoading: PropTypes.bool
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.loading,
    errMsg: state.authReducer.errMsg
  };
};

export default connect(mapStateToProps, null)(Register);
