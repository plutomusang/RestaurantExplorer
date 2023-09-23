import React, { useEffect } from 'react';
import './App.css';
import RestaurantMap  from './components/RestaurantMap';
import DrawCircleMap  from './components/DrawCircleMap';
import RestaurantList from './components/RestaurantList/RestaurantList';
import useCebuRestaurantData from './hooks/useCebuRestaurantData';

const apiKey =  process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
const location = '10.3157,123.8854'; // Latitude and longitude of Cebu
const radius = 5000; // 5km radius

function App() {
  const { restaurants, loading } = useCebuRestaurantData({
    apiKey,
    location,
    radius,
  });

  return (
    <div className="App">
      <h1>Restaurants in Cebu</h1>
      {/* <RestaurantMap restaurants={restaurants} /> */}
      <RestaurantList restaurants={restaurants} loading={loading}/>
    </div>
  );
}

export default App;