import React, { useContext, useRef, useEffect } from "react";
import ContactConext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactConext);
  const text = useRef();

  const { filtered, filterContacts, clearFilter } = contactContext;

  useEffect(() => {
    if (!filtered) {
      text.current.value = "";
    }
  }, [contactContext, filtered]);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
