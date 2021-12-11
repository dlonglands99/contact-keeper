import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Dave Johnson",
        email: "Davetherave@gmail.com",
        phone: "07770707077",
        type: "Personal",
      },
      {
        id: 2,
        name: "Sarah King",
        email: "kSarah@gmail.com",
        phone: "07770707077",
        type: "Professional",
      },
      {
        id: 3,
        name: "Mike Limpus",
        email: "mickybo@gmail.com",
        phone: "07770707077",
        type: "Personal",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // add contact

  // delete contact

  // set current contact

  // clear current contact

  // update contact

  // filter contacts

  // clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
