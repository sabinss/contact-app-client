import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Profile from "../assets/images/images.png";
import { deleteContact } from "../redux/actions/contact";

const ContactItem = ({ contact }) => {
  const { name, address, email, phonenumber, _id } = contact;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="contact bg-light">
      <Container>
        <Row xs={4}>
          <Col xs={2}>
            <img src={Profile} alt="profile" />
          </Col>
          <Col xs={10}>
            <Row xs={12}>
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
              <Col
                xs={2}
                style={{
                  justifyContent: "flex-end",
                  display: "flex",
                  marginTop: 10
                }}
              >
                <div
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    dispatch(deleteContact(_id));
                  }}
                >
                  <MdDeleteOutline size={30} color="red" />
                </div>
                <div
                  style={{ paddingLeft: 10 }}
                  onClick={() => {
                    navigate(`/edit-contact/${_id}`);
                  }}
                >
                  <BiEdit size={30} color="blue" onClick={() => {}} />
                </div>
              </Col>
            </Row>
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
