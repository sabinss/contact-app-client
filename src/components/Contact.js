import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import ContactItem from "./ContactItem";

const Contact = ({ contacts }) => {
  return (
    <section className="container">
      <Fragment>
        <div className="profiles">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          ) : (
            <h4>No Contacts found...</h4>
          )}
        </div>
      </Fragment>
    </section>
  );
};

export default Contact;
