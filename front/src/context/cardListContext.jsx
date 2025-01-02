import React, { createContext, useState } from 'react';

export const CardListContext = createContext();

export const CardListProvider = ({ children }) => {
  const [isCardListVisible, setIsCardListVisible] = useState(true);

  const toggleCardList = () => {
    setIsCardListVisible((prev) => !prev);
  };

  return (
    <CardListContext.Provider value={{ isCardListVisible, toggleCardList }}>
      {children}
    </CardListContext.Provider>
  );
};
