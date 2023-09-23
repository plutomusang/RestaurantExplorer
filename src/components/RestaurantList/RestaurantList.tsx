import React from 'react';
import useCebuRestaurantData from '../../hooks/useCebuRestaurantData';

const apiKey =  process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
const location = '10.3157,123.8854'; // Latitude and longitude of Cebu
const radius = 5000; // 5km radius

const RestaurantList = () => {
  const { restaurants, loading } = useCebuRestaurantData({
    apiKey,
    location,
    radius,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
