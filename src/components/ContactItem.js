import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Profile from "../assets/images/images.png";

const ContactItem = ({ contact }) => {
  const { name, address, email, phonenumber } = contact;
  return (
    <div className="contact bg-light">
      <Container>
        <Row xs={4}>
          <Col xs={2}>
            <img src={Profile} alt="profile" />
          </Col>
          <Col xs={10}>
            <div
              style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column"
              }}
            >
              <p className="contactTxt">Username: {name}</p>
              <p className="contactTxt"> PhoneNumber: {phonenumber}</p>
              <p className="contactTxt"> Email: {email}</p>
              <p className="contactTxt"> Address: {address}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ContactItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ContactItem;
