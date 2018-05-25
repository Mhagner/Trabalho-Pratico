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
        <div className="panel-heading">Create Contact</div>
        <div className="panel-body">
        
        <form onSubmit={this.handleSubmit} className=''>
          <div className="well well-lg add-contact">
            <ImageInput
              className='avatar'
              name='avatarURL'
              maxHeight={64}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="Nome">Nome</label>
            <input type='text' name='name' placeholder='Nome' className="form-control"/>
          </div>
          <div className='form-group'>
            <label htmlFor="email">E-mail</label>
            <input type='text' name='email' placeholder='E-mail'  className="form-control"/>
           
          </div>
          <button className="btn btn-primary">Adicionar Contato</button>
          <Link className='btn btn-default' to='/'>Voltar</Link>
        </form>
        </div>
      </div>
    )
  }
}

export default CreateContact
