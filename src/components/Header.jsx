import { NavLink } from "react-router-dom"
import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { FilterContext } from "../context/FilterContext";
// CSS
import style from "./Header.module.css"

import Logo from "../assets/logo.jpg";

function Header() {

  const {setCategory, setType} = useContext(CategoryContext);
  const {setFilter, setOrdenation, setSearch} = useContext(FilterContext);
  const [input, setInput] = useState("");

  const handleClick = (e) => {

    const value = e.target.innerHTML;

    switch(value) {
      case "Sapatos": 
        setCategory("sapatos");
        setType("tenis");
        setFilter(null)
        setOrdenation(null)
        setSearch(null)
        break;
      case "Calças": 
        setCategory("roupas");
        setType("calca");
        setFilter(null)
        setOrdenation(null)
        setSearch(null)
        break;
      case "Camisetas":
        setCategory("roupas");
        setType("camiseta");
        setFilter(null)
        setOrdenation(null)
        setSearch(null)
        break;
      default: break;
    }   
  } 

  const handleSearch = (e) => {
    e.preventDefault();
    const key = input.toLowerCase();
    setSearch(key);
    setInput("")
  }

  return (
    <>
      <div className={style.disclaimer}>
        <div>
          <a href="#">Acesse sua conta</a> ou <a href="#">Cadastre-se</a>
        </div>
      </div>
      <div className={style.header}> 
        <div className={style.container}>
          <div className={style.logo}>
            <img src={Logo} alt="Logo" />
          </div>
          <div className={style.input}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} required />
            <input type="button" className={style.btn} onClick={handleSearch} value="Buscar" />
          </div>
        </div>
        <nav>
          <ul>
            <li className={style.link}>
              <NavLink to="/">Pagina inicial</NavLink>
            </li>
            <li className={style.link}>
              <NavLink onClick={handleClick} to="/products/camisetas">Camisetas</NavLink>
            </li>
            <li className={style.link}>
              <NavLink onClick={handleClick} to="/products/calcas">Calças</NavLink>
            </li>
            <li className={style.link}>
              <NavLink onClick={handleClick} to="/products/sapatos">Sapatos</NavLink>
            </li>
            <li className={style.link}>
              <NavLink to="/contato">Contato</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
    
  )
}

export default Header