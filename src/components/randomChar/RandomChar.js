import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Marvelservice from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import { useState, useEffect } from "react";

const RandomChar = () => {
  const { getCharacterId } = Marvelservice();

  const [char, setChar] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, []);

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    setLoading(true);
    getCharacterId(id).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
    setTimeout(() => {
      clearError();
    }, 3000);
  };

  const clearError = () => {
    updateChar();
    setError(false);
  };

  const View = () => {
    return (
      <>
        <div className="randomchar__block">
          <img
            src={char.thumbnail}
            alt="Random character"
            className="randomchar__img"
          />
          <div className="randomchar__info">
            <p className="randomchar__name">{char.name}</p>
            <p className="randomchar__descr">
              {char.description
                ? char.description.slice(0, 150) + "..."
                : "Description is not aviable"}
            </p>
            <div className="randomchar__btns">
              <a href={char.url} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={char.wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };
  const content = !(loading || error) ? <View /> : null;
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="randomchar">
      {content}
      {spinner}
      {errorMessage}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={clearError}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
