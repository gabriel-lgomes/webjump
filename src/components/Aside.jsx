import { NavLink } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useLastWordFromURL from '../hooks/useLastWordFromURL';
import { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import { FilterContext } from '../context/FilterContext';

// CSS
import style from './Aside.module.css'

function Aside() {

  const {data, isLoading, error} = useFetch("http://localhost:3000/products");
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const lastWord = useLastWordFromURL();
  const {type, setType} = useContext(CategoryContext);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueFilter, setUniqueFilter] = useState([]);
  const [filterType, setFilterType] = useState(null); 
  const {setFilter} = useContext(FilterContext);
  
  useEffect(() => {
    switch (lastWord) {
      case "calcas":
        setType("calca");
        break;
      case "camisetas":
        setType("camiseta");
        break;
      case "sapatos":
        setType("tenis");
        break;
      default:
        break;
    }
  
    if (data) {
      setFilteredProducts(data.filter((product) => product.path.includes(type)));
      const arrCategories = data.map((item) => item.category);
      setUniqueCategories(arrCategories.filter((item, index) => arrCategories.indexOf(item) === index));
    }
   
  
  },  [lastWord, data, type, setType]);

  useEffect(() => { 
    if (filteredProducts) {
      const arrColors = filteredProducts.map((item) => item.filter[0].color);
      const arrGender = filteredProducts.map((item) => item.filter[0].gender); 
      
      if(arrColors.includes(undefined)) {
        setUniqueFilter(arrGender.filter((item, index) => arrGender.indexOf(item) === index));
        setFilterType('gender');
      } else {
        setUniqueFilter(arrColors.filter((item, index) => arrColors.indexOf(item) === index));
        setFilterType('color');
      } 

    }
  }, [filteredProducts]);

  const handleClick = (e) => {
    const typeFilter = e.currentTarget.getAttribute("data-name"); 

    setFilter({type: typeFilter}); 

  }
  

  return (
    <div className={ lastWord ? style.asideProducts + ' ' + style.aside : style.aside}>
      {!lastWord && 
        <>
          <nav>
            <ul>
              <li className={style.link}>
                <NavLink to="/">Pagina inicial </NavLink>
              </li>
              <li className={style.link}>
                <NavLink to="/products">Camisetas</NavLink>
              </li>
              <li className={style.link}>
                <NavLink to="/products">Calças</NavLink>
              </li>
              <li className={style.link}>
                <NavLink to="/products">Sapatos</NavLink>
              </li>
              <li className={style.link}>
                <NavLink to="/contato">Contato</NavLink>
              </li>
            </ul>
          </nav>
        </>
      }

        {lastWord && 
          <>  
            <h3>Categorias</h3>
            <nav>
              <ul>
                {
                  uniqueCategories.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                }
              </ul>
            </nav>
 
              
            {filterType === "color" ? 
              <>
                <h3>Cores</h3>
                <nav>
                  <ul className={style.listColors}>
                    {
                      uniqueFilter.map((item) => (   
                        (item &&    
                          <li
                            onClick={ handleClick }
                            data-name={item} 
                            key={item} 
                            className={item === "white" ? style.border + ' ' + style.colors : style.colors} 
                            style={{background: `${item}`}}>  
                          </li>
                        )
                      ))
                    }
                  </ul>
                </nav>
              </>
              :
              <>
                <h3>Gênero</h3>
                <nav>
                  <ul>
                    {uniqueFilter.map((item, index) => (
                      <li onClick={handleClick} data-name={item} key={index}>{item}</li>
                    ))}
                  </ul>
                </nav>
              </>
            } 
          </>
        }

        {error && <p>{error.message}</p>}
        {isLoading && <p>Carregando...</p>}
        
      

    </div>
  )
}

export default Aside