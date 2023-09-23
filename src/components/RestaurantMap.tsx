import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript, Circle } from '@react-google-maps/api';

interface Restaurant {
  name: string;
  lat: number;
  lng: number;
}

interface RestaurantMapProps {
  restaurants: Restaurant[];
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 10.3157, // Cebu's latitude
  lng: 123.8854, // Cebu's longitude
};

const RestaurantMap: React.FC<RestaurantMapProps> = ({ restaurants }) => {
    const [circleCenter, setCircleCenter] = useState({ lat: 10.3157, lng: 123.8854 }); // Center of Cebu
    const [circleRadius, setCircleRadius] = useState(1000); // 5km radius (adjust as needed)
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.name}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            title={restaurant.name}
          />
        ))}
        <Circle center={circleCenter} radius={circleRadius} />
      </GoogleMap>
    </LoadScript>
  );
};

export default RestaurantMap;
// Make this file a module
export {};