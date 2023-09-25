import React from 'react';
import styled from 'styled-components';
import { RestaurantData } from '../../types/types';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns for headers */
  grid-gap: 10px;
  margin-top: 20px;
`;

const GridItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
`;

const Icon = styled.img`
  vertical-align: middle;
  margin-right: 4px;
`;

interface RestaurantTableProps {
  restaurants: RestaurantData[]  | null;
  handleClick: (restaurant: RestaurantData) => void;
}

const RestaurantTable: React.FC<RestaurantTableProps> = ({ restaurants, handleClick }) => {
  return (
    <GridContainer>
      <GridItem>Restaurant Name</GridItem>
      <GridItem>Lattitude</GridItem>
      <GridItem>Longitude</GridItem>
      <GridItem>Vicinity</GridItem>
      <GridItem>Types</GridItem>
      {restaurants ? (
        restaurants.map((restaurant) => (
          <React.Fragment key={restaurant.place_id}>
            <GridItem onClick={() => handleClick(restaurant)}>
              <Icon src={restaurant.icon} alt="Restaurant Icon" />
              {restaurant.name}
            </GridItem>
            <GridItem>{restaurant.geometry.location.lat}</GridItem>
            <GridItem>{restaurant.geometry.location.lng}</GridItem>
            <GridItem>{restaurant.vicinity}</GridItem>
            <GridItem>
              <ul>
                {restaurant.types.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </GridItem>
          </React.Fragment>
        ))
      ) : (
        <GridItem>No restaurants available</GridItem>
      )}
    </GridContainer>
  );
};

export default RestaurantTable;
