// src/components/Map.tsx

import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'; // Import necessary components

interface MapContainerProps {
  google: any; // Replace 'any' with appropriate types for Google Maps props
}

const MapContainer: React.FC<MapContainerProps> = ({ google }) => {
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState<any[]>([]); // Replace 'any[]' with appropriate types
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});
  const [selectedShape, setSelectedShape] = useState<any | null>(null); // Replace 'any' with the appropriate type
  const [restaurantsWithinShape, setRestaurantsWithinShape] = useState<any[]>([]); // Replace 'any[]' with the appropriate type
  const [drawingManager, setDrawingManager] = useState<any | null>(null); // Replace 'any' with the appropriate type

  useEffect(() => {
    // Initialize the map with drawing options
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 10.3157, lng: 123.8854 }, // Centered on Cebu
      zoom: 12,
      mapTypeId: 'roadmap',
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        drawingModes: ['circle', 'rectangle'],
      },
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: false,
    });

    drawingManager.setMap(map);

    setDrawingManager(drawingManager);

    fetchRestaurantData(map); // Fetch restaurant data when the component mounts
  }, [google]);

  const fetchRestaurantData = (map: any) => {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: map.center,
      radius: 5000,
      keyword: 'restaurant',
      query: `restaurant in ${location}`,
    };

    service.textSearch(request, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Enhance each restaurant with types
        const restaurantsWithInfo = results.map((restaurant: any) => ({
          ...restaurant,
          types: restaurant.types,
          customerCount: 0, // Initialize customer count to 0
        }));

        setRestaurants(restaurantsWithInfo);
      }
    });
  };

  const countRestaurantsWithinShape = (shape: any) => {
    if (!shape) {
      return;
    }

    const bounds = shape.getBounds();
    const restaurantsWithinShape = restaurants.filter((restaurant) => {
      const restaurantPosition = restaurant.geometry.location;
      return bounds.contains(restaurantPosition);
    });

    setRestaurantsWithinShape(restaurantsWithinShape);
  };

  const getDirections = (restaurant: any) => {
    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: location,
      destination: restaurant.formatted_address,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(google.maps.Map); // Set the map object directly
        directionsDisplay.setDirections(result);
      } else {
        console.error('Error fetching directions:', status);
      }
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={() => fetchRestaurantData(Map)}>Find Restaurants</button>
      </div>
      <div id="map" style={{ height: '500px', width: '100%' }} />
      <div>
        {selectedShape && (
          <div>
            <p>Number of restaurants within the shape: {restaurantsWithinShape.length}</p>
          </div>
        )}
      </div>
      <div>
        {restaurants
          .filter((restaurant) =>
            Object.keys(selectedFilters).some(
              (filterType) => selectedFilters[filterType] && restaurant.types.includes(filterType)
            )
          )
          .map((restaurant) => (
            <div key={restaurant.place_id}>
              <h3>{restaurant.name}</h3>
              <p>Food Specialties: {restaurant.specialties.join(', ')}</p>
              <p>Customer Count: {restaurant.customerCount}</p>
              <button onClick={() => getDirections(restaurant)}>Get Directions</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCO7JhrlpHzJek_wO6okvlbSBWn4VZLYNM', // Replace with your Google Maps API key
})(MapContainer);
