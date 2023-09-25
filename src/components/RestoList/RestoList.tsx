import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { RestaurantData, VisitedRestaurant } from '../../types/types';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Define a custom type for GridItem props
interface GridItemProps {
  isSelected: boolean;
}

const GridItem = styled.div<GridItemProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.isSelected ? '#f2f2f2' : 'white')};
  cursor: pointer;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;
const VisitCountCard = styled.div`
  background-color: green;
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin-left: auto; /* To push it to the right */
  border-radius: 10px; /* Add border-radius property */
  color: white; /* Change text color to white */
  font-size: 12px; /* Add font-size property with your preferred size */
`;
interface RestoListProps {
  restaurants: RestaurantData[] | null;
  myVisitedRestaurant: VisitedRestaurant[] | null;
  onRestaurantSelect: (restaurant: RestaurantData) => void;
}

const RestoList: React.FC<RestoListProps> = ({ restaurants, onRestaurantSelect, myVisitedRestaurant }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);

  const handleSelectRestaurant = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant);
    onRestaurantSelect(restaurant);
  };
  const getTotalVisit = (placeId: string) => {
    if (!myVisitedRestaurant || myVisitedRestaurant.length === 0) {
      // If myVisitedRestaurant is null or empty, return 0
      return 0;
    }
  
    // Use the filter method to count occurrences of place_id
    const visitCount = myVisitedRestaurant.filter((item) => item.place_id === placeId).length;
  
    return visitCount;
  };
  return (
    <GridContainer>
      <GridItem isSelected={false}>Restaurant Name</GridItem>
      {restaurants
        ? restaurants.map((restaurant) => (
            <GridItem
              key={restaurant.place_id}
              isSelected={selectedRestaurant === restaurant}
              onClick={() => handleSelectRestaurant(restaurant)}
            >
              <Icon src={restaurant.icon} alt="Restaurant Icon" />
              {restaurant.name}
              {getTotalVisit(restaurant.place_id) > 0 && (
                <VisitCountCard>
                  {'Visited ' + getTotalVisit(restaurant.place_id)}
                </VisitCountCard>
              )}
            </GridItem>
          ))
        : <div>No restaurants available</div>}
    </GridContainer>
  );
};

export default RestoList;
