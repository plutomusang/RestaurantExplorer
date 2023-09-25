import React from 'react';
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
  const { name, photos, types, rating, vicinity } = restaurant;
  // Construct the URL of the image using the photo_reference
  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

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
              {type}
            </TypeIcon>
          ))}
      </TypesContainer>
      <Vicinity>{vicinity}</Vicinity>
    </CardContainer>
  );
};

export default RestaurantCard;
export {};