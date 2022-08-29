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
import { Pagination } from "../components/Pagination";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { loading, contacts, deleteContactSuccess, page } = useSelector(
    (state) => state.contactReducer
  );

  useEffect(() => {
    dispatch(fetchContacts(page));
  }, [page]);

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
          <i className="fab fa-connectdevelop" /> Find your contacts
        </p>
        <div
          class="input-group"
          style={{ width: 600, marginBottom: 15, marginLeft: 22 }}
        >
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => setSearch(event.target.value)}
            aria-describedby="search-addon"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20
          }}
        >
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
      <Pagination />
    </div>
  );
};
