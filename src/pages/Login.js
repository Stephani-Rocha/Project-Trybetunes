import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends Component {
  // aqui estou setando o valor inicial do meu estado. Nesse caso o "name" começa como uma string vazia;
  constructor() {
    super();
    this.state = {
      nameUser: '',
      loading: false,
      redirectSearch: false,
    };
  }

  // a função handleChange tem como objetivo alterar o status do meu estado. Nesse caso ela vai receber o valor que for digitado no input;
  handleChange = ({ target }) => {
    this.setState({
      nameUser: target.value,
    });
  }

  // a função buttonLogin tem como objetivo "salvar" o nome digitado pelo usuário, depois do botão "Enviar" ter sido clicado;
  buttonLogin = async () => {
    this.setState({ loading: true }); // após o clique no botão, aparecerá a mensagem de carregamento;
    const { nameUser } = this.state;
    const func = await createUser({ name: nameUser }); // chama a função que cria o usuário;
    console.log(func);
    this.setState({ redirectSearch: true, loading: false }); // após a criação do usuário redireciona para a rota "search";
  }

  render() {
    const { nameUser, loading, redirectSearch } = this.state;
    return (
      <div data-testid="page-login">
        { redirectSearch && <Redirect to="/search" /> }
        { loading ? (
          <Carregando />
        ) : (
          <form>
            <label htmlFor="input">
              <input
                type="text"
                placeholder="Nome"
                value={ nameUser }
                id="input"
                name="input"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ nameUser.length <= 2 } // Dica da Franciane Manestrina (condicionar o botão utilizando a propriedade disabled);
              onClick={ this.buttonLogin }
            >
              Entrar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

export default Login;
