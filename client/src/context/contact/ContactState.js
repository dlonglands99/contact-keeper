import React, { useReducer } from "react";
import axios from 'axios';
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  }

  // add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  }

  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: contact });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // delete contact
  const deleteContact = async (_id) => {
    try {
      const res = await axios.delete(`/api/contacts/${_id}`);
      dispatch({ type: DELETE_CONTACT, payload: _id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    } 
  };

  // set current contact
  const setCurrentContact = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
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
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        clearContacts,
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
