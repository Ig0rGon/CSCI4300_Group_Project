import React from "react";
import "../styles/Card.css";

interface CardProps {
  image: string;
  price: string;
  category: string;
  description: string;
  location: string;
}

const Card: React.FC<CardProps> = ({ image, price, category, description, location }) => {
  return (
    <div className="card">
      <img src={image} alt={description} className="card-image" />
      <div className="card-content">
        <h3 className="card-price">{price}</h3>
        <p className="card-category">{category}</p>
        <p className="card-description">{description}</p>
        <p className="card-location">{location}</p>
      </div>
    </div>
  );
};

export default Card;