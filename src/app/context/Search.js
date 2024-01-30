import React, { createContext, useContext, useState } from "react";
export const SearchContext = createContext();
export const SearchCont = () => useContext(SearchContext);
const SearchItem = ({ children }) => {
  // for Navbar and Product Page

  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};
export default SearchItem;
