import React, { Component } from 'react';
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

      </header>
    );
  }
}

export default Header;
