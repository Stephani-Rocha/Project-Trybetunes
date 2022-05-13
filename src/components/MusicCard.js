import React, { Component } from 'react';
import propTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { check } = this.props;
    this.setState({ checked: check });
  }

  favoritaMusica = () => {
    const { checked } = this.state;
    if (checked === false) {
      this.setState({ carregando: true,
      }, async () => {
        const { trackName, previewUrl, trackId } = this.props;
        const chamaFunc = await addSong({ trackName, previewUrl, trackId });
        this.setState({ carregando: false, checked: true });
        console.log(chamaFunc);
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { carregando, checked } = this.state;
    return (
      <div>
        { carregando ? <Carregando />
          : (
            <div>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="check">
                Favorita
                <input
                  type="checkbox"
                  id="check"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.favoritaMusica }
                  checked={ checked }
                />
              </label>
            </div>
          )}
        ;
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  check: propTypes.bool.isRequired,
};

export default MusicCard;
