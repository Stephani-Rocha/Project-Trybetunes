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

    favoritaMusica = ({ target }) => {
      const { checked } = this.state;
      this.setState({ checked: target.checked, carregando: true,
      }, async () => {
        const { trackName, previewUrl } = this.props;
        console.log(checked);
        if (checked === false) {
          await addSong({ trackName, previewUrl });
          this.setState({ carregando: false });
        }
        if (checked !== false) {
          this.setState({ carregando: false });
        }
      });
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
};

export default MusicCard;
