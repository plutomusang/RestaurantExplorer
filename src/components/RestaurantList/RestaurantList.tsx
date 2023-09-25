import React, { useState } from 'react';
import { RestaurantData } from '../../types/types';

interface RestaurantListProps {
  loading: boolean;
  restaurants: RestaurantData[]  | null;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, loading }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);

  const handleSelectRestaurant = (restaurant: RestaurantData | null) => {
    setSelectedRestaurant(restaurant);
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
    <select onChange={(e) => handleSelectRestaurant(restaurants ? restaurants[Number(e.target.value)] : null)}>
      <option value="">Select a restaurant</option>
      {restaurants
        ? restaurants.map((restaurant, index) => (
            <option key={restaurant.place_id} value={index.toString()}>
              {restaurant.name}
            </option>
          ))
        : null // Render nothing or a loading message here when 'restaurants' is null
      }
    </select>
    {selectedRestaurant && (
      <div>
        <h2>Selected Restaurant:</h2>
        <p>Name: {selectedRestaurant.name}</p>
        {/* Add more details here as needed */}
      </div>
    )}
  </div>
  );
};

export default RestaurantList;
