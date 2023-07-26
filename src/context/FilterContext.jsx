import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({children}) => {

  const [filter, setFilter] = useState(null);
  const [ordenation, setOrdenation] = useState(null);
  const [search, setSearch] = useState(null);

  return (
    <FilterContext.Provider value={{filter, setFilter, ordenation, setOrdenation, search, setSearch}}>
      {children}
    </FilterContext.Provider>
  )

}