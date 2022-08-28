import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import { login } from "./../redux/actions/auth";

import { connect, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const Login = ({ isLoading, errMsg = "" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      setPasswordErr("Please enter password");
    }

    if (!email) {
      setEmailErr("Please enter Email");
    }
    if (email && password) {
      dispatch(login({ email, password }, navigate));
    }
  };

  const ErrorMsg = ({ errMsg }) => {
    return <span style={{ color: "red" }}>{errMsg}</span>;
  };

  return (
    <div className="loginForm">
      {errMsg ? (
        <Alert key={"danger"} variant={"danger"}>
          {errMsg}
        </Alert>
      ) : null}

      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Contact Manager App
      </h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => {
              if (!validateEmail(event.target.value)) {
                setEmailErr("Invalid Email");
              } else {
                setEmailErr(null);
              }
              setEmail(event.target.value);
            }}
          />
          {emailErr && <ErrorMsg errMsg={emailErr} />}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => {
              if (event.target.value) {
                setPasswordErr(null);
                setPassword(event.target.value);
              } else {
                setPasswordErr("Please enter password");
              }
            }}
          />
          {passwordErr && <ErrorMsg errMsg={passwordErr} />}
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

        <Button
          variant="primary"
          className="loginBtn"
          onClick={(event) => {
            console.log("event", event);
            event.preventDefault();
            navigate("/signup");
          }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

Login.prototypes = {
  isLoading: PropTypes.bool
};
const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    isLoading: state.authReducer.loading,
    errMsg: state.authReducer.errMsg
  };
};

export default connect(mapStateToProps, null)(Login);
