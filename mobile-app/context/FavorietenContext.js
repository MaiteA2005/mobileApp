import React, { createContext, useContext, useState } from 'react';

const FavorietenContext = createContext();

export const FavorietenProvider = ({ children }) => {
  const [favorieten, setFavorieten] = useState([]);

  const addToFavorieten = (product) => {
    setFavorieten((prev) => [...prev, product]);
  };

  const removeFromFavorieten = (productId) => {
    setFavorieten((prev) => prev.filter(p => p.id !== productId));
  };

  return (
    <FavorietenContext.Provider value={{ favorieten, addToFavorieten, removeFromFavorieten }}>
      {children}
    </FavorietenContext.Provider>
  );
};

export const useFavorieten = () => useContext(FavorietenContext);
export default FavorietenContext;