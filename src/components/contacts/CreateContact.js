import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from '../../utils/ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onCreateContact)
      this.props.onCreateContact(values)
  }

  render() {
    return (
      <div className="panel panel-default">
        <div class="panel-heading">Create Contact</div>
        <div class="panel-body">
        <Link className='close-create-contact' to='/'>Fechar</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='form-group'>
            <label for="Nome">Nome</label>
            <input type='text' name='name' placeholder='Nome' className="form-control"/>
          </div>
          <div className='form-group'>
            <label for="email">E-mail</label>
            <input type='text' name='email' placeholder='E-mail'  className="form-control"/>
           
          </div>
          <button className="btn btn-default">Adicionar Contato</button>
        </form>
        </div>
      </div>
    )
  }
}

export default CreateContact
