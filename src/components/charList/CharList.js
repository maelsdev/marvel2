import "./charList.scss";
import Spinner from "../spinner/Spinner";
import Marvelservice from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import { useEffect, useState,useRef } from "react";

const CharList = (props) => {
  const {getAllcharacters,loading,error } = Marvelservice();
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(210)
  const [newItemsLoading, setNewItemsLoading] = useState(false)
  const [ended,setEnded] = useState(false)
//Запит на сервер і отримання 9-ти персонажів по offset, initial - выдповыдаэ за ініціалізацію первинного завантаження
  const request = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
      getAllcharacters(offset).then(onCharListLoaded).catch(onError);
  };
//Завантаження першої сторінки персонажів  
  useEffect(() => {
    request(offset,true);
    // eslint-disable-next-line
  }, []);
   
  const onCharListLoaded = (newItems) => {
    setCharList(charList=>[...charList,...newItems]); // Записуємо персонажів в стейт, при завантаженні нових дозаписуємо в кінець масиву
    setOffset(offset => offset + 9) // перезаписуємо значення offset при завантаженні 
    setNewItemsLoading(false)
    if (newItems.length < 9) { 
      setEnded(true)
    }
  };

  
  const onError = () => {
    
    setTimeout(() => {
      clearError();
    }, 3000);
  };

  const clearError = () => {
    request();
    
  };

  const itemRefs = useRef([]);

    const focusOnItem = (id) => {
       
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

  const charGrid = (arr) => {
    const items = arr.map((item,i) => {
      
      return (
        <li
          key={item.id}
          className="char__item"
          ref={el => itemRefs.current[i] = el}
          onClick={() => {
            props.itemChoise(item.id)
            focusOnItem(i)
          }}
        >
          <img src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  const view = charGrid(charList);

  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="char__list">
      {view}
      {errorMessage}
      {spinner}
      <button
        className="button button__main button__long"
        onClick={() => request(offset)}
        disabled={newItemsLoading}
        style={{'display': ended ? 'none' : 'block'}}
        >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
