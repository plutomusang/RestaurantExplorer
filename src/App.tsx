import React, { useEffect, useState } from 'react';
import './App.css';
import RestaurantMap from './components/Map/RestaurantMap';
import useCebuRestaurantData from './hooks/useCebuRestaurantData';
import RestaurantTable from './components/Table/RestaurantTable';
import { RestaurantData, VisitedRestaurant } from './types/types';
import FilterTypePanel from './components/FilterTypePanel/FilterTypePanel';
import RestoList from './components/RestoList/RestoList';
import styled from 'styled-components';
import RestaurantCard from './components/RestaurantCard/RestaurantCard';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
const location = '10.3157,123.8854'; // Latitude and longitude of Cebu
const radius = 5000; // 5km radius

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column; /* Stack children vertically */
`;

const RestaurantContainer = styled.div`
  display: grid;
  background-color: #f2f2f2;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  gap:10px;
  max-width:1200px;
`;
const ItemContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 300px 1fr;
  gap:10px;
`;
const RightContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr, 1fr;
  grid-template-columns: 1fr;
  margin-top: 20px,
`;
function App() {
  const { restaurants, loading } = useCebuRestaurantData({
    apiKey,
    location,
    radius,
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);
  const [filteredRestaurant, setFilteredRestaurant] = useState<RestaurantData[] | null>(null);
  const [showCircle, setShowCircle]  = useState<boolean>(false);
  // Moved the state declaration of myVisitedRestaurants to the top level.
  const [myVisitedRestaurants, setMyVisitedRestaurants] = useState<VisitedRestaurant[]>([]);

  // Function to handle restaurant row click
  const handleRestaurantClick = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant);

    // Create a new visited restaurant object
    const visitedRestaurant = {
      place_id: restaurant.place_id,
      name: restaurant.name,
      dateVisited: new Date().toISOString(),
    };

    // Append the new visited restaurant to the list
    setMyVisitedRestaurants([...myVisitedRestaurants, visitedRestaurant]);
  };

  const handleFilteredRestaurantClick = (restaurant: RestaurantData[]) => {
    setFilteredRestaurant(restaurant);
    setShowCircle(true);
  };

  return (
     <div className="App">
      <MainContainer>

      
        <RestaurantContainer>
          <h1>Restaurants in Cebu</h1>
          <FilterTypePanel restaurants={restaurants} handleClick={handleFilteredRestaurantClick} />
          <ItemContainer>
              <RestoList restaurants={filteredRestaurant} onRestaurantSelect={handleRestaurantClick} myVisitedRestaurant={myVisitedRestaurants}/>
              <RightContainer>
                  <RestaurantMap
                    restaurants={filteredRestaurant}
                    myVisitedRestaurant={myVisitedRestaurants}
                    onRestaurantSelect={handleRestaurantClick}
                    showCircle={showCircle}
                    direction={
                      selectedRestaurant
                        ? {
                            lat: selectedRestaurant.geometry.location.lat,
                            lng: selectedRestaurant.geometry.location.lng,
                          }
                        : null
                    }
                  />
                  {selectedRestaurant && (<RestaurantCard restaurant={selectedRestaurant!} />)}
              </RightContainer>

          </ItemContainer>

        </RestaurantContainer>
        </MainContainer>
      </div>
  );
}

export default App;
