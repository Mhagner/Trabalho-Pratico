import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './components/contacts/ListContacts';
import CreateContact from './components/contacts/CreateContact';
import * as ContactsAPI from './apis/ContactsAPI';
import './App.css';
import './bootstrap.min.css';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts });
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }
  
  render() {
    return (
      <div className="container">
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            />
        )}/>
        <Route path='/create' render={({history}) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
            />
        )}/>
      </div>
    );
  }
}

export default App;
