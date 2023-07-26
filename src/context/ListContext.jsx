import { createContext, useState } from "react";

export const ListContext = createContext();

export const ListProvider = ({children}) => {

    const [listType, setListType] = useState("grid");

    return (
      <ListContext.Provider value={{listType, setListType}}>
        {children}
      </ListContext.Provider>
    )

}