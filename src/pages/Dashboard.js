import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { fetchContacts } from "../redux/actions/contact";
import Contact from "../components/Contact";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { RESET_STATE } from "../redux/types";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { loading, contacts, deleteContactSuccess, deleteContact } =
    useSelector((state) => state.contactReducer);

  useEffect(() => {
    if (contacts.length == 0) {
      dispatch(fetchContacts());
    }
  }, []);

  useEffect(() => {
    if (deleteContactSuccess) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch({ type: RESET_STATE });
      }, 3000);
    }
  }, [deleteContactSuccess]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <section className="container">
        {deleteContactSuccess && (
          <Alert
            key={"success"}
            variant={"success"}
            onClose={() => {
              dispatch({ type: RESET_STATE });
            }}
            dismissible
          >
            Contact Deleted successfully.
          </Alert>
        )}
        <h1 className="large text-primary">Your Contacts</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop" /> Find your contacts developers
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20
          }}
        >
          <input
            type="text"
            placeholder="search contact"
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => {
              navigate("/add-contact");
            }}
          >
            Add Contact
          </Button>
        </div>
        {contacts && (
          <Contact
            contacts={contacts.filter((contact) =>
              contact.name.toLowerCase().includes(search)
            )}
          />
        )}
      </section>
    </div>
  );
};
