import "./charInfo.scss";
import Marvelservice from "../../services/MarvelService";
import { useState, useEffect } from "react";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const CharInfo = (props) => {
  const { getCharacterId } = Marvelservice();
  const [char, setChar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.itemId]);

  const updateChar = () => {
    if (!props.itemId) {
      return;
    }
    setLoading(true)
    getCharacterId(props.itemId).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (res) => {
    setLoading(false)
    setChar(res);
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

  const renderChar = () => {
    return (
      <>
        <div className="char__basics">
          <img src={char.thumbnail} alt={char.name} />
          <div>
            <div className="char__info-name">{char.name}</div>
            <div className="char__btns">
              <a href={char.url} className="button button__main">
                <div className="inner">Homepage</div>
              </a>
              <a href={char.wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{char.description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {char.comics && char.comics.length > 0 ? null : 'There is no comics with this character'}
        
          {!char
            ? null
            : char.comics.map((item, i) => {
                // eslint-disable-next-line array-callback-return
                if (i > 9) return;
              return <li className="char__comics-item" key={i}>{item.name}</li>;
              })}
        </ul>
      </>
    );
  };

  const charInfo = renderChar();
  const spinner = loading && !error ? <Spinner/> : null
  const skeleton = char === "" && !spinner && !error ? <Skeleton /> : null;
  const content = !loading && !skeleton && !error ? charInfo : null
  const errorMessage = error ? <ErrorMessage/> : null

  return <div className="char__info">{skeleton}{content}{spinner}{ errorMessage}</div>;
};

export default CharInfo;
