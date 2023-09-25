import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RestaurantData } from '../../types/types';

const CardContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const RestaurantName = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`;

const RestaurantImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const RatingIcon = styled.i`
  font-size: 18px;
  color: #f5a623;
  margin-right: 4px;
`;

const RatingValue = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const TypeIcon = styled.i`
  font-size: 16px;
  margin-right: 4px;
  color: #757575;
`;

const Vicinity = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

interface RestaurantCardProps {
  restaurant: RestaurantData;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { name, photos, types, rating, vicinity, place_id } = restaurant;
  // Construct the URL of the image using the photo_reference
  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  // Function to fetch additional restaurant details using the place_id
  const fetchRestaurantDetails = async () => {
    try {
      // Perform an API request to fetch additional details using the place_id
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        // Store the fetched details in state
        setRestaurantDetails(data.result);
        // Expand the details section
        setExpandedDetails(true);
        alert('ExpandedDetails' + JSON.stringify(data.result));
      } else {
        // Handle any errors here
        console.error('Failed to fetch restaurant details');
      }
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };
  const formatLabel = (label:string) => {
    // Split the label by underscores and capitalize the first letter of each word
    const words = label.split('_').map((word:string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Join the words with spaces
    return words.join(' ');
  };
  useEffect(() => {
    // Fetch restaurant details when the component mounts
    if (place_id) {
      fetchRestaurantDetails();
    }
  }, [place_id]);
  return (
    <CardContainer>
      <RestaurantName>{name}</RestaurantName>
      {photos && photos.length > 0 && <RestaurantImage src={imageUrl} alt={`${name} Restaurant`} />}
      <RatingContainer>
        <RatingIcon className="material-icons">star</RatingIcon>
        <RatingValue>{rating}</RatingValue>
      </RatingContainer>
      <TypesContainer>
        {types &&
          types.map((type, index) => (
            <TypeIcon key={index} className="material-icons">
              {formatLabel(type)}
            </TypeIcon>
          ))}
      </TypesContainer>
      <Vicinity>{vicinity}</Vicinity>
    </CardContainer>
  );
};

export default RestaurantCard;
export {};