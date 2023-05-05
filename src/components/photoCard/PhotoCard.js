import React from "react";

import { Link } from "react-router-dom";

import "./photoCard.scss";

const PhotoCard = ({ data }) => {
  const { id, description, urlSmall, authorName } = data;

  return (
    <Link to={`/${id}`} className="photo-card">
      <img src={urlSmall} alt={description} />
      <h2>{authorName}</h2>
      <p>{description}</p>
    </Link>
  );
};

export default PhotoCard;
