import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline, MdFavorite } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { GrFavorite } from "react-icons/gr";
import Profile from "../assets/images/images.png";
import {
  deleteContact,
  makeFavouriteContact,
  updateContact,
  updateProfilePic
} from "../redux/actions/contact";

import { storage_bucket } from "../firebase/firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Button from "react-bootstrap/esm/Button";

const ContactItem = ({ contact }) => {
  const {
    name,
    address,
    email,
    phonenumber,
    _id,
    isFavourite,
    profileUrl = ""
  } = contact;

  const [markFavourite, setMarkFavourite] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const uploadFile = (e) => {
    const file = e.target.files[0];
    console.log("type", file.type);
    if (file.type === "	image/jpeg" || file.type === "image/png") {
      let fileRef = ref(storage_bucket, file.name);

      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("progress", progress);
        },
        (error) => {
          console.log("firebase upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("downloadURL", downloadURL);
            dispatch(updateProfilePic(_id, downloadURL));
          });
        }
      );
    } else {
      console.log("error");
      toast.error("Only png and jpeg image are allowed");
    }
  };

  const fileTypeRef = React.useRef();
  return (
    <div className="contact bg-light">
      <Container>
        <Row xs={4}>
          <Col xs={2}>
            <img
              src={profileUrl || Profile}
              alt="profile"
              width={100}
              height={100}
            />
            <Button
              onClick={() => {
                fileTypeRef.current.click();
              }}
            >
              Upload Pic
            </Button>

            <input
              type="file"
              onChange={uploadFile}
              style={{ display: "none" }}
              ref={fileTypeRef}
            />
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
                    dispatch(makeFavouriteContact(_id, !isFavourite));
                  }}
                >
                  {isFavourite ? (
                    <MdFavorite size={30} />
                  ) : (
                    <GrFavorite size={30} />
                  )}
                </div>
                <div
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    dispatch(deleteContact(_id));
                  }}
                >
                  <MdDeleteOutline size={30} />
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
