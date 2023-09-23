import { useEffect, useState } from 'react';
import axios from 'axios';
import sampleData from './sampleData.json';
import { SampleData, RestaurantData } from '../types/types';

interface UseCebuRestaurantDataProps {
  apiKey: string;
  location: string;
  radius: number;
}

interface UseCebuRestaurantDataResult {
  restaurants: RestaurantData[];
  loading: boolean;
}

const useCebuRestaurantData = ({
  apiKey,
  location,
  radius,
}: UseCebuRestaurantDataProps): UseCebuRestaurantDataResult => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Create the Google Places API request URL
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant&key=${apiKey}`;
    
    // Fetch restaurant data from Google Places API
    axios
      .get(apiUrl, {
        timeout: 10000, // Set the timeout to 10 seconds (adjust as needed)
      })
      .then((response) => {
        if (response.data && response.data.results) {
          setRestaurants((response.data.results as RestaurantData[]) || []);
        }
      })
      .catch(() => {
        // Handle the error by setting the error state and returning sampleData.results as a fallback
        setRestaurants((sampleData.results as RestaurantData[]) || []); // Specify the type here
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiKey, location, radius]);

  return { restaurants, loading };
};

export default useCebuRestaurantData;
