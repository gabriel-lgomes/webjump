import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells, faList } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { FilterContext } from '../context/FilterContext';

// CSS
import style from "./Filter.module.css";

function Filter() {

  const {setListType} = useContext(ListContext); 
  const {ordenation, setOrdenation} = useContext(FilterContext); 

  const handleChange = (e) => { 
    setOrdenation(e.target.value); 
  }

  const handleClick = (e) => {
    e.preventDefault();

    const typeList = document.querySelectorAll(".typeList");

    typeList.forEach((item) => {
      item.classList.remove(style.active);  
    })

    e.currentTarget.classList.add(style.active);
    
    const type = e.currentTarget.getAttribute("data-name");

    setListType(type);
  }

  return (
    <div className={style.filter}>
      <div className={style.list}>
        <a href="#" data-name="grid" className={`${style.active} typeList`} onClick={handleClick}>
          <FontAwesomeIcon 
            className={style.active} 
            icon={faTableCells}
          />
        </a>
        <a href="#" data-name="list" className='typeList' onClick={handleClick}>
          <FontAwesomeIcon icon={faList} />
        </a>
      </div>
      <div className={style.select}>
        ordenar por 
        <select onChange={handleChange}>
          <option value="">Ordenar</option>
          <option value="lowestPrice">Menor Preço</option>
          <option value="biggestPrice">Maior Preço</option>
          <option value="growing">A - Z</option>
          <option value="descending">Z - A</option>
        </select>
      </div>
    </div>
  )
}

export default Filter