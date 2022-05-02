import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nomeArtista: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      nomeArtista: target.value,
    });
  }

  render() {
    const { nomeArtista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          value={ nomeArtista }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ nomeArtista.length <= 1 }
          data-testid="search-artist-button"
        >
          Pesquisa
        </button>
      </div>
    );
  }
}

export default Search;
