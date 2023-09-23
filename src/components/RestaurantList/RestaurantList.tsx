import React, { useState } from 'react';
import { RestaurantData } from '../../types/types';

interface RestaurantListProps {
  loading: boolean;
  restaurants: RestaurantData[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, loading }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);

  const handleSelectRestaurant = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant);
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <select onChange={(e) => handleSelectRestaurant(restaurants[Number(e.target.value)])}>
        <option value="">Select a restaurant</option>
        {restaurants.map((restaurant, index) => (
          <option key={restaurant.place_id} value={index.toString()}>
            {restaurant.name}
          </option>
        ))}
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
