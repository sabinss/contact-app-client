import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { fetchContacts } from "../redux/actions/contact";
import Contact from "../components/Contact";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { loading, contacts } = useSelector((state) => state.contactReducer);
  console.log("contacgts", contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

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
        <Contact
          contacts={contacts.filter((contact) =>
            contact.name.toLowerCase().includes(search)
          )}
        />
      </section>
    </div>
  );
};
