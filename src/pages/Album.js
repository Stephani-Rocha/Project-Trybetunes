import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listaMusicas: [],
      nomeArtista: '',
      nomeAlbum: '',
      carregando: false,
      favoritas: [],
    };
  }

  componentDidMount = () => {
    this.exibiListaDeMusicas();
    this.exibiListaDeFavoritas();
  }

exibiListaDeMusicas = async () => {
  const {
    match: {
      params: { id },
    },
  } = this.props;
  const chamaFunc = await getMusics(id);
  this.setState({
    listaMusicas: chamaFunc,
    nomeArtista: chamaFunc[0].artistName,
    nomeAlbum: chamaFunc[0].collectionName });
}

exibiListaDeFavoritas = async () => {
  this.setState({ carregando: true });
  const listaFavoritas = await getFavoriteSongs();
  this.setState({ carregando: false, favoritas: listaFavoritas });
}

render() {
  // this.exibiListaDeFavoritas();
  const {
    listaMusicas,
    nomeArtista,
    nomeAlbum,
    carregando,
    favoritas,
  } = this.state;

  return (
    <div data-testid="page-album">
      <Header />
      { carregando ? (<Carregando />)
        : (
          <div>
            <p data-testid="artist-name">{ nomeArtista }</p>
            <p data-testid="album-name">{ nomeAlbum }</p>

            {/*         Dica da Franciane Manestrina.
        Utilizando o segundo parametro de map "index",
        consigo ignorar o index 0 (nesse caso a 1ª posição do array) de trackName e previewUrl, pois eles estavam vazios;
 */}
            { listaMusicas.map((elemento, index) => (
              <div
                key={ elemento.trackId }
              >
                {index > 0
            && (<MusicCard
              trackName={ elemento.trackName }
              previewUrl={ elemento.previewUrl }
              trackId={ elemento.trackId }
              item={ elemento }
              check={ favoritas.some((item) => (
                item.trackId === elemento.trackId
              )) }
            />)}
              </div>
            ))}
            ;
          </div>
        )}
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),

};

Album.defaultProps = {
  match: null,
};

export default Album;
