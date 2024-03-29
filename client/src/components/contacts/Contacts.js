import { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, [])

  if (contacts && contacts.length === 0 && !loading) {
    return <h4>Add a Contact</h4>;
  }

  return (
    <Fragment>
      {contacts && !loading ? (
        <TransitionGroup>
          {filtered &&
            filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
          {!filtered &&
            contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      ) : <Spinner />}
      
    </Fragment>
  );
};

export default Contacts;
