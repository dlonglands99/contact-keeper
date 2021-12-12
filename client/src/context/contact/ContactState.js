import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
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
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // add contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // set current contact
  const setCurrentContact = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // filter contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
