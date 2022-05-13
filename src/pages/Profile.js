import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      nome: '',
      email: '',
      descrição: '',
      imagem: '',
    };
  }

  componentDidMount() {
    this.exibiPerfil();
  }

  exibiPerfil = async () => {
    this.setState({ carregando: true });
    const chamaFunc = await getUser();
    console.log(chamaFunc);
    this.setState({
      carregando: false,
      nome: chamaFunc.name,
      email: chamaFunc.email,
      descrição: chamaFunc.description,
      imagem: chamaFunc.image });
  }

  render() {
    const { carregando, nome, email, descrição, imagem } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { carregando ? (<Carregando />)
          : (
            <div>
              <h3>Nome</h3>
              <p>{nome}</p>
              <h3>Email</h3>
              <p>{email}</p>
              <h3>Descrição</h3>
              <p>{descrição}</p>
              <h3>Imagem</h3>
              <img src={ imagem } alt={ imagem } data-testid="profile-image" />
              <Link to="/profile/edit"> Editar perfil </Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
