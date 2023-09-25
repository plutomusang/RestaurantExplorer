import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RestaurantData } from '../../types/types';

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  border-radius: 4px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

interface FilterTypePanelProps {
  restaurants: RestaurantData[];
  handleClick: (filteredRestaurants: RestaurantData[]) => void;
}

const FilterTypePanel: React.FC<FilterTypePanelProps> = ({ restaurants, handleClick }) => {
  const allTypes = restaurants.flatMap((restaurant) => restaurant.types);
  const uniqueTypes = [...new Set(allTypes)];

  const [filterHotelTypes, setFilterHotelTypes] = useState<string[]>(uniqueTypes);

  const handleCheckboxChange = (type: string) => {
    const updatedFilterHotelTypes = filterHotelTypes.includes(type)
      ? filterHotelTypes.filter((t) => t !== type)
      : [...filterHotelTypes, type];

    setFilterHotelTypes(updatedFilterHotelTypes);

    const filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.types.some((t) => updatedFilterHotelTypes.includes(t))
    );

    handleClick(filteredRestaurants);
  };

  return (
    <CheckboxContainer>
      {uniqueTypes.map((type) => (
        <CheckboxItem key={type}>
          <input
            type="checkbox"
            checked={filterHotelTypes.includes(type)}
            onChange={() => handleCheckboxChange(type)}
          />
          <label>{type}</label>
        </CheckboxItem>
      ))}
    </CheckboxContainer>
  );
};

export default FilterTypePanel;
