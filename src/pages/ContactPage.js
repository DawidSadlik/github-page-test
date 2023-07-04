import React from "react";
import { UserContext } from "../services/UserContext";

const ContactPage = () => {
  return (
    <UserContext.Consumer>
      {(value) => (
        <div>
          <h2>Value is: {value.name}</h2>
          <h1>Contact</h1>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default ContactPage;
