import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      name: '',
      email: '',
      description: '',
      image: '',
      btnDesabilitado: true,
      redireciona: false,
    };
  }

  componentDidMount() {
    this.exibePerfil();
  }

  exibePerfil = async () => {
    this.setState({ carregando: true });
    const chamaFunc = await getUser();
    this.setState({
      carregando: false,
      name: chamaFunc.name,
      email: chamaFunc.email,
      description: chamaFunc.description,
      image: chamaFunc.image }, () => {
      this.habilitaBtn();
    });
  }

  habilitaBtn = () => {
    const { name, email, description, image } = this.state;
    if (name !== ''
      && email !== ''
      && description !== ''
      && image !== '') {
      this.setState({ btnDesabilitado: false });
    } else {
      this.setState({ btnDesabilitado: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.habilitaBtn();
    });
  }

  atualizaInformacoes = async () => {
    this.setState({ carregando: true });
    const { name, email, description, image } = this.state;
    const chamaFunc = await updateUser({ name, email, description, image });
    if (chamaFunc) {
      this.setState({ redireciona: true, carregando: false });
    }
  }

  render() {
    const { carregando,
      name,
      email,
      description,
      image,
      btnDesabilitado,
      redireciona } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { carregando ? (<Carregando />)
          : (
            <div>
              <label htmlFor="input-name">
                <input
                  id="input-name"
                  data-testid="edit-input-name"
                  type="text"
                  value={ name }
                  name="name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-email">
                <input
                  id="input-email"
                  data-testid="edit-input-email"
                  type="email"
                  value={ email }
                  name="email"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-descricao">
                <input
                  id="input-descricao"
                  data-testid="edit-input-description"
                  type="text"
                  value={ description }
                  name="description"
                  onChange={ this.handleChange }
                />
              </label>
              <img src={ image } alt={ image } />
              <input
                data-testid="edit-input-image"
                type="text"
                value={ image }
                name="image"
                onChange={ this.handleChange }
              />
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ btnDesabilitado }
                onClick={ this.atualizaInformacoes }
              >
                Salvar
              </button>
            </div>
          )}
        { redireciona && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
