import React from "react";
import ContactFilter from "../../context/contact/ContactFilter";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
