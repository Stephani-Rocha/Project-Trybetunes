import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nomeArtista: '',
      loading: false,
      listaDeAlbuns: [],
      semRetorno: false,
      resposta: false,
      guardaArtista: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      nomeArtista: target.value,
    });
  }

  buttonPesquisa = () => {
    this.setState({
      nomeArtista: '',
    });
  }

  semRetorno = () => {
    const { listaDeAlbuns } = this.state;
    if (listaDeAlbuns.length === 0) {
      this.setState({ semRetorno: true });
    }
  }

  pesquisaArtista = async () => {
    this.setState({ loading: true });
    const { nomeArtista } = this.state;
    await searchAlbumsAPI(nomeArtista);
    this.setState({ listaDeAlbuns: await searchAlbumsAPI(nomeArtista), loading: false });
    this.setState({ resposta: true, guardaArtista: nomeArtista });
    this.semRetorno();
    this.buttonPesquisa();
  }

  render() {
    const { nomeArtista,
      loading,
      listaDeAlbuns,
      semRetorno,
      resposta,
      guardaArtista } = this.state;
    console.log(listaDeAlbuns);
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (
          <Carregando />
        ) : (
          <div>
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
              onClick={ this.pesquisaArtista }
            >
              Pesquisa
            </button>
          </div>
        )}
        { resposta
        && (<p>{`Resultado de álbuns de: ${guardaArtista}`}</p>)}
        { listaDeAlbuns.length > 0 && (
          listaDeAlbuns.map((albuns) => (
            <div key={ albuns.collectionId }>
              <img src={ albuns.artworkUrl100 } alt="imagem do album" />
              <Link
                data-testid={ `link-to-album-${albuns.collectionId}` }
                to={ `/album/${albuns.collectionId}` }
              >
                { albuns.collectionName }
              </Link>
              <p>
                { albuns.artistName }
              </p>
            </div>
          )))}
        { semRetorno && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
