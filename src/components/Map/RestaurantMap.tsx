import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript, Circle, DirectionsRenderer } from '@react-google-maps/api';
import { RestaurantData, VisitedRestaurant } from '../../types/types';

interface RestaurantMapProps {
  restaurants: RestaurantData[] | null;
  myVisitedRestaurant: VisitedRestaurant[] | null;
  onRestaurantSelect: (restaurant: RestaurantData) => void;
  showCircle: boolean;
  direction: {
    lat: number;
    lng: number;
  } | null;
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 10.3157, // Cebu's latitude
  lng: 123.8854, // Cebu's longitude
};

const circleOptions = {
  center: center,
  strokeColor: 'red', // Transparent stroke color
  fillColor: 'rgba(0, 0, 0, 0.2)', // Black fill color with 20% opacity
};

const RestaurantMap: React.FC<RestaurantMapProps> = ({ restaurants, direction, myVisitedRestaurant, onRestaurantSelect, showCircle }) => {
  const [circleCenter, setCircleCenter] = useState({ lat: 10.3157, lng: 123.8854 }); // Center of Cebu
  const [circleRadius, setCircleRadius] = useState(5000); // 5km radius (adjust as needed)
  const [mapMounted, setMapMounted] = useState(true); // State to control map rendering
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null); // State to hold directions data
  const [visitedRestaurantIds, setVisitedRestaurantIds] = useState<string[]>([]); // State to store visited restaurant IDs

  // Function to reset the map
  const resetMap = () => {
    setMapMounted(false); // Unmount the existing map
    setMapMounted(true); // Mount a new map
    setDirections(null); // Clear directions data
  };

  // Function to mark a restaurant as visited
  const markAsVisited = (restaurant: RestaurantData) => {
    if (!visitedRestaurantIds.includes(restaurant.place_id)) {
      setVisitedRestaurantIds([...visitedRestaurantIds, restaurant.place_id]);
    }
    onRestaurantSelect(restaurant);
  };

  useEffect(() => {
    if (direction) {
      // Calculate and set directions using the Google Maps Directions Service
      const directionsService = new google.maps.DirectionsService();

      const origin = new google.maps.LatLng(center.lat, center.lng);
      const destination = new google.maps.LatLng(Number(direction.lat), Number(direction.lng));

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Directions request failed:', status);
          }
        }
      );
    }
  }, [direction]);

  // Check if visited restaurants exist and mark them as visited
  useEffect(() => {
    if (myVisitedRestaurant && restaurants) {
      myVisitedRestaurant.forEach((visitedRestaurant) => {
        const foundRestaurant = restaurants.find((restaurant) => restaurant.place_id === visitedRestaurant.place_id);
        if (foundRestaurant) {
          setVisitedRestaurantIds([...visitedRestaurantIds, foundRestaurant.place_id]);
        }
      });
    }
  }, [myVisitedRestaurant, restaurants]);

  return (
    <div>
      {mapMounted && (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
            {restaurants
              ? restaurants.map((restaurant) => (
                  <Marker
                    key={restaurant.name}
                    position={{
                      lat: restaurant.geometry.location.lat,
                      lng: restaurant.geometry.location.lng,
                    }}
                    title={restaurant.name}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      fillColor: visitedRestaurantIds.includes(restaurant.place_id) // Check if restaurant is visited
                        ? 'green' // Change marker color to green for visited restaurants
                        : 'red', // Default color for unvisited restaurants
                      fillOpacity: 1,
                      strokeColor: 'black',
                      strokeWeight: 1,
                    }}
                    onClick={() => markAsVisited(restaurant)}
                  />
                ))
              : null}
            {showCircle && (
              <>
                <Marker
                  position={circleCenter}
                  title="Your Location"
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10, // Adjust the size as needed
                    fillColor: 'blue', // Adjust the color as needed
                    fillOpacity: 1, // Adjust the opacity as needed
                    strokeColor: 'black', // Adjust the stroke color as needed
                    strokeWeight: 1, // Adjust the stroke weight as needed
                  }}
                />
                <Circle center={circleCenter} radius={circleRadius} options={circleOptions} />
              </>
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default RestaurantMap;
