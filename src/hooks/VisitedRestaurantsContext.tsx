// VisitedRestaurantsContext.tsx

import React, { createContext, useContext, useState } from 'react';
import { VisitedRestaurant, VisitedRestaurantsContextData } from '../types/types';


export const VisitedRestaurantsContext = createContext<VisitedRestaurantsContextData | undefined>(
  undefined
);

interface VisitedRestaurantsProviderProps {
  children: React.ReactNode; // Specify the children prop
}

export const VisitedRestaurantsProvider: React.FC<VisitedRestaurantsProviderProps> = ({ children }) => {
  const [visitedRestaurants, setVisitedRestaurants] = useState<VisitedRestaurant[]>([]);

  const addVisitedRestaurant = (restaurant: VisitedRestaurant) => {
    setVisitedRestaurants([...visitedRestaurants, restaurant]);
  };

  return (
    <VisitedRestaurantsContext.Provider value={{ visitedRestaurants, addVisitedRestaurant }}>
      {children}
    </VisitedRestaurantsContext.Provider>
  );
};
