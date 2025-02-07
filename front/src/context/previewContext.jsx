import React, { createContext, useState, useContext } from "react";

const CardContext = createContext();

export const useCard = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const [data, setData] = useState({
    title: "",
    bio: "",
    url: "",
    template: "5",
    links: [{ title: '', url: '' }],
    imageUrl: "",
    previewUrl: "",
    urlStatus: "",
  });

  return (
    <CardContext.Provider value={{ data, setData }}>
      {children}
    </CardContext.Provider>
  );
};
