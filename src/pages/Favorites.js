import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
// import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      listaFavoritas: [],
      checked: true,
    };
  }

  componentDidMount() {
    this.musicasFavoritas();
  }

  musicasFavoritas = async () => {
    this.setState({ carregando: true });
    const chamaFunc = await getFavoriteSongs();
    this.setState({ listaFavoritas: chamaFunc, carregando: false });
  }

  render() {
    const { listaFavoritas, carregando, checked } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { carregando ? (<Carregando />)
          : (
            <div>
              { listaFavoritas.map((item) => (
                <div key={ item.trackId }>
                  <MusicCard
                    trackName={ item.trackName }
                    previewUrl={ item.previewUrl }
                    trackId={ item.trackId }
                    favoritas={ this.musicasFavoritas }
                    path="favorites"
                    checked={ checked }
                  />
                </div>
              ))}
            </div>)}
      </div>
    );
  }
}

export default Favorites;
