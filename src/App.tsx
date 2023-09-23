import React, { useEffect } from 'react';
import './App.css';
import RestaurantMap  from './components/RestaurantMap';
import DrawCircleMap  from './components/DrawCircleMap';
import RestaurantList from './components/RestaurantList/RestaurantList';
function App() {
  const restaurants = [
    {
      name: 'Restaurant 1',
      lat: 10.3157,
      lng: 123.8854,
    },
    {
      name: 'Restaurant 2',
      lat: 10.3245,
      lng: 123.8973,
    },
    // Add more restaurants as needed
  ];
  return (
    <div className="App">
      <h1>Restaurants in Cebu</h1>
      {/* <RestaurantMap restaurants={restaurants} /> */}
      <RestaurantList />
    </div>
  );
}

export default App;