import React from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";


const ArtistQuestionScreen = ({question, onAnswer}) => {
  const {
    answers,
    song,
  } = question;

  return <section className="game__screen">
    <h2 className="game__title">Кто исполняет эту песню?</h2>
    <div className="game__track">
      <AudioPlayer src={song.src}/>
    </div>

    <form className="game__artist" onChange={onAnswer}>
      {answers.map((it, i) => <div className="artist" key={i}>
        <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`} id={`artist-${i}`} />
        <label className="artist__name" htmlFor={`artist-${i}`}>
          <img className="artist__picture" src={it.picture} alt={it.artist} />
          {it.artist}
        </label>
      </div>)}
    </form>
  </section>;
};


ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  }).isRequired,
};


export default ArtistQuestionScreen;
