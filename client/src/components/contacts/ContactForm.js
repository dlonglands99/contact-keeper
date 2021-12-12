import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { current, addContact, updateContact, clearCurrentContact } =
    contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Professional",
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      emptyForm();
    }
  }, [contactContext, current]);

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearCurrentContact();
  };

  const clearAll = () => {
    clearCurrentContact();
  };

  const emptyForm = () => {
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "Personal",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone Number"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="Professional"
        checked={type === "Professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <input
        type="radio"
        name="type"
        value="Personal"
        checked={type === "Personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button
            className="btn btn-light btn-block"
            value=""
            onClick={clearAll}
          >
            Clear Selection
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
