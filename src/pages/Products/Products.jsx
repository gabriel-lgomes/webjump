import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"
import useLastWordFromURL from "../../hooks/useLastWordFromURL";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { ListContext } from "../../context/ListContext";
import { FilterContext } from "../../context/FilterContext";

// Components
import Product from "../Product/Product";

// CSS
import style from "./Products.module.css";
import Filter from "../../components/Filter";


function Products() {

  const {data, isLoading, error} = useFetch("http://localhost:3000/products");
  const lastWord = useLastWordFromURL();
  const {category, type, setType} = useContext(CategoryContext);
  const {listType} = useContext(ListContext); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const {filter, ordenation, search} = useContext(FilterContext); 

  useEffect(() => {
 
    switch(lastWord) {
      case "calcas":  
        setType("calca");
        break;
      case "camisetas":  
        setType("camiseta");
        break;
      case "sapatos": 
        setType("tenis");
        break;
    }   
 

    if(data) { 
      let filteredData = data.filter((product) => product.path.includes(type));
       
      if (filter) {  
        if (filter.type.includes("man")) {
          filteredData = filteredData.filter((product) => product.filter[0].gender === filter.type);
        } else {
          filteredData = filteredData.filter((product) => product.filter[0].color === filter.type);
        }  
      }
      setFilteredProducts(filteredData);
    } 

    if(ordenation) {
      
      let filteredData = filteredProducts;
      switch(ordenation){
        case "lowestPrice":
          filteredData = filteredData.slice().sort((a, b) => a.price - b.price);
          setFilteredProducts(filteredData)
          break;
        case "biggestPrice":
          filteredData = filteredData.slice().sort((a, b) =>  b.price - a.price);
          setFilteredProducts(filteredData)
          break;
        case "growing":
          filteredData = filteredData.slice().sort((a, b) => a.name.localeCompare(b.name));
          setFilteredProducts(filteredData)
          break;
        case "descending":
          filteredData = filteredData.slice().sort((a, b) => b.name.localeCompare(a.name));
          setFilteredProducts(filteredData)
          break;
        default: break;

      }
    }

    if(search) {
      let filteredData = data.filter((product) => product.path.includes(type));

      filteredData = filteredData.filter((product) => product.name.toLowerCase().includes(search));

      setFilteredProducts(filteredData);

      console.log(filteredProducts)

    }


  }, [category, type, data, lastWord, setType, filter, ordenation, search]); 
 
  return (
    <div>

      {isLoading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {filteredProducts && <>
        <h2 className={style.title}>{lastWord}</h2>
          <hr className={style.border} />
          <Filter />
          <div className={listType === "list" ? style.products + ' ' + style.list : style.products}>
            {filteredProducts && filteredProducts.map((product) => (
              <Product 
                key={product.id} 
                name={product.name} 
                price={product.price} 
                image={product.image} 
                link={product.id}  
              />
            )
            )}
          </div>
      </>}
    </div>
  )
}

export default Products