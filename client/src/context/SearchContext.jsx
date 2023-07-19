import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  return (
    <SearchContext.Provider value={{ searchValue, handleSearchChange }}>
      {children}
    </SearchContext.Provider>
  );
};
