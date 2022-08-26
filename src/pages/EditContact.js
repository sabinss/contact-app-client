import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import { AddContactSchema } from "../validationSchema/addContactSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  createContact,
  getContactById,
  updateContact
} from "../redux/actions/contact";
import Alert from "react-bootstrap/Alert";

import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import { RESET_STATE } from "../redux/types";

export const EditContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isContactCreated, setContactCreated] = useState(false);
  const {
    contact,
    contactById,
    updateContact: isLoading,
    updateContactSuccess,
    errMsg
  } = useSelector((state) => state.contactReducer);
  const params = useParams();

  useEffect(() => {
    formikRef.current?.resetForm();
    if (params.id) {
      dispatch(getContactById(params.id, (contact) => {}));
    }
  }, [params.id]);

  const formikRef = React.useRef(null);

  const formik = useFormik({
    initialValues: contact
  });

  return (
    <>
      <Header />
      <section className="container" style={{ marginTop: 70 }}>
        <h1>Edit Contact</h1>
        {updateContactSuccess && (
          <Alert
            key={"success"}
            variant={"success"}
            onClose={() => {
              dispatch({ type: RESET_STATE });
            }}
            dismissible
          >
            Contact Updated successfully.
          </Alert>
        )}

        {errMsg && (
          <Alert
            key={"danger"}
            variant={"danger"}
            onClose={() => {
              dispatch({ type: RESET_STATE });
            }}
            dismissible
          >
            {errMsg}
          </Alert>
        )}
        <Formik
          enableReinitialize
          initialValues={contact || formik.vlaues}
          validationSchema={AddContactSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            dispatch(
              updateContact(values, (success) => {
                setContactCreated(true);
              })
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            resetForm
          }) => (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  variant="primary"
                  onClick={() => {
                    resetForm();
                    navigate("/dashboard");
                  }}
                >
                  Go Back
                </Button>
              </div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder="Enter your name"
                    onChange={(event) => {
                      handleChange("name")(event.target.value);
                    }}
                  />
                  {touched.name && errors.name && (
                    <p style={{ color: "red" }}>{errors.name}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.email}
                    placeholder="Enter your email"
                    onChange={(event) => {
                      handleChange("email")(event.target.value);
                    }}
                    name="email"
                  />
                  {touched.email && errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Phonenumber</Form.Label>
                  <Form.Control
                    type="number"
                    value={values.phonenumber}
                    onChange={(event) => {
                      handleChange("phonenumber")(event.target.value);
                    }}
                    placeholder="Enter phonenumber"
                    name="phonenumber"
                  />
                  {touched.phonenumber && errors.phonenumber && (
                    <p style={{ color: "red" }}>{errors.phonenumber}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => {
                      handleChange("address")(event.target.value);
                    }}
                    value={values.address}
                    placeholder="Enter you address"
                    name="address"
                  />
                  {touched.address && errors.address && (
                    <p style={{ color: "red" }}>{errors.address}</p>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit(values);
                  }}
                >
                  Update {isLoading ?? "...loading"}
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </section>
    </>
  );
};
