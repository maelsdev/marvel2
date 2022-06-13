import "./charList.scss";
import Spinner from "../spinner/Spinner";
import Marvelservice from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import { useEffect, useState } from "react";

const CharList = (props) => {
  const { getAllcharacters } = Marvelservice();
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    updateCharList();
    // eslint-disable-next-line
  }, []);

  const updateCharList = () => {
    setLoading(true);
    getAllcharacters().then(onCharListLoaded).catch(onError);
  };

  const onCharListLoaded = (charList) => {
    setCharList(charList);
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
    updateCharList();
    setError(false);
  };

  const charGrid = (arr) => {
    const items = arr.map((item) => {
      return (
        <li
          key={item.id}
          className="char__item"
          onClick={() => props.itemChoise(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  const view = charGrid(charList);

  const content = !(loading || error) ? view : null;
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="char__list">
      {content}
      {errorMessage}
      {spinner}
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
