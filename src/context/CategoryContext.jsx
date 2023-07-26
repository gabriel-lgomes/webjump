import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {
  const [category, setCategory] = useState("roupas");
  const [type, setType] = useState(null);

  return (
    <CategoryContext.Provider value={{category, setCategory, type, setType}}>
      {children}
    </CategoryContext.Provider>
  )

}