import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Circle, Rectangle } from '@react-google-maps/api';

// Define a custom type for the map object
interface CustomGoogleMap extends google.maps.Map {}
interface Restaurant {
    name: string;
    lat: number; // Latitude
    lng: number; // Longitude
    // Other restaurant properties
  }
const RestaurantMap: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [map, setMap] = useState<CustomGoogleMap | null>(null); // Use the custom type here
  const [circleCenter, setCircleCenter] = useState({ lat: 10.3157, lng: 123.8854 }); // Center of Cebu
  const [circleRadius, setCircleRadius] = useState(5000); // 5km radius (adjust as needed)
  const [rectangleBounds, setRectangleBounds] = useState(null); // Define your rectangle bounds

  useEffect(() => {
    // Fetch restaurant data or use your own method to get restaurant locations
    // Replace this with your actual data fetching logic
    const fetchRestaurants = async () => {
      try {
        // Fetch restaurant data and set it in the state
        const data = await fetch('YOUR_RESTAURANT_API_ENDPOINT');
        const restaurantData = await data.json();
        setRestaurants(restaurantData);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const onMapLoad = (map: google.maps.Map | null) => {
    if (map) {
      setMap(map);
    }
  };

  const onCircleBoundsChanged = () => {
    if (map && restaurants) {
      const bounds = map.getBounds();
      if (bounds) {
        const restaurantsWithinCircle = restaurants.filter((restaurant) =>
          restaurant.lat !== undefined &&
          restaurant.lng !== undefined &&
          bounds.contains(new window.google.maps.LatLng(restaurant.lat, restaurant.lng))
        );
        console.log('Restaurants within circle:', restaurantsWithinCircle.length);
      }
    }
  };

  const onRectangleBoundsChanged = () => {
    // Calculate the number of restaurants within the rectangle
    if (map && rectangleBounds) {
      const bounds = map.getBounds();
      if (bounds) {
        const restaurantsWithinRectangle = restaurants.filter((restaurant) =>
          restaurant.lat !== undefined &&
          restaurant.lng !== undefined &&
          bounds.contains(new window.google.maps.LatLng(restaurant.lat, restaurant.lng))
        );
        console.log('Restaurants within rectangle:', restaurantsWithinRectangle.length);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        center={circleCenter}
        zoom={14}
        onLoad={onMapLoad}
        onBoundsChanged={onCircleBoundsChanged} // Change to onRectangleBoundsChanged for rectangle
      >
        {/* Add your circle or rectangle */}
        <Circle center={circleCenter} radius={circleRadius} />
        {/* <Rectangle bounds={rectangleBounds} /> */}
      </GoogleMap>
    </LoadScript>
  );
};

export default RestaurantMap;
export {};