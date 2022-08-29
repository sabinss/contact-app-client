import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import { login, signup } from "../redux/actions/auth";

import { connect, useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const Signup = ({ isLoading, errMsg = "" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [registrationFailed, setRegisterFailed] = useState(false);

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
      setLoading(true);
      dispatch(
        signup({ email, password }, (success) => {
          console.log("register", success);
          if (success) {
            setLoading(false);
            setRegisterSuccess(true);
            setTimeout(() => {
              setRegisterSuccess(false);
            }, 3000);
          } else {
            setLoading(false);
            setRegisterFailed(true);
            setTimeout(() => {
              setRegisterFailed(false);
            }, 3000);
          }
        })
      );
    }
  };

  const ErrorMsg = ({ errMsg }) => {
    return <span style={{ color: "red" }}>{errMsg}</span>;
  };
  return (
    <div className="loginForm">
      {registrationFailed ? (
        <Alert key={"danger"} variant={"danger"}>
          {errMsg}
        </Alert>
      ) : null}
      {registerSuccess && (
        <Alert key={"success"} variant={"success"}>
          Registration is successfull.Please navigate to login page for Login.
        </Alert>
      )}

      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Register</h1>
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
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordErr && <ErrorMsg errMsg={passwordErr} />}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="loginBtn"
          onClick={onSubmit}
        >
          Register
          {loading && <Spinner animation="border" />}
        </Button>
        <Form.Text className="text-muted">Go Back to Login Page</Form.Text>

        <Button
          variant="primary"
          type="submit"
          className="loginBtn"
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </Form>
    </div>
  );
};

Signup.prototypes = {
  isLoading: PropTypes.bool
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.loading,
    errMsg: state.authReducer.errMsg
  };
};

export default connect(mapStateToProps, null)(Signup);
