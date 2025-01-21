import React, { createContext, useState, useContext } from "react";

const EditCardContext = createContext();

export const useCard = () => useContext(EditCardContext);

export const EditCardProvider = ({ children }) => {
  const [data, setData] = useState({
    title: "",
    bio: "",
    url: "",
    template: "",
    links: [{ title: '', url: '' }],
  });

  return (
    <EditCardContext.Provider value={{ data, setData }}>
      {children}
    </EditCardContext.Provider>
  );
};
