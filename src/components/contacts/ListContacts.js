import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className=''>
        <div className="panel panel-default">
          <div className="panel-heading">Pesquisar</div>
          <div className="panel-body">

            <div className="form-group">
              <label htmlFor="">Nome: </label>
              <input
                className='form-control'
                type='text'
                placeholder='Pesquisar Contatos'
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>


          </div>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Em exibição {showingContacts.length} of {contacts.length} total</span>
            <button className="btn btn-default btn-sm" onClick={this.clearQuery}>Mostrar Todos</button>
          </div>
        )}
        <div className="well well-lg add-contact">
          <Link
            to='/create'
            className='btn btn-primary'
          >Adicionar contatos</Link>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Foto</th>
              <th>E-Mail</th>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {showingContacts.map((contact, index) => (
              <tr key={index} >
                <td>
                  <img src={contact.avatarURL} />
                </td>
                <td className='contact-details'>
                  {contact.email}
                </td>
                <td>
                  {contact.name}
                </td>
                <td>
                  <button onClick={() => onDeleteContact(contact)} className='btn btn-default btn-sm'>
                    Remover
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListContacts
