import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_STATE } from "../redux/types";
import { getLoggedInUser } from "../helper/strings";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: RESET_STATE });
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Navbar bg="dark">
        <Row style={{ width: "100%" }}>
          <Col xs={4}>
            {" "}
            <Navbar.Brand className="headerBrand">
              <Link to={"/dashboard"} className="headerBrand">
                Contact App
              </Link>
            </Navbar.Brand>
          </Col>
          <Col xs={8}>
            <Row className="align-items-end">
              <Col xs={2}>
                <h5 className="username">{getLoggedInUser().email}</h5>
              </Col>
              <Col xs={10}>
                <Button onClick={handleLogout}>Logout</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Navbar>
    </>
  );
};

export default Header;
