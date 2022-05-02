import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.chamaGetUser();
  }

  chamaGetUser = async () => {
    this.setState({ loading: true });
    const funcGetUser = await getUser();
    this.setState({ userName: funcGetUser.name, loading: false });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loading && <Carregando /> }
        <p data-testid="header-user-name">
          { userName }
        </p>
        <div>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
