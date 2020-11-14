import React from 'react';

function MovieItem({ name, poster, age_rating, genres }) {
  return (
    <>
      <span className="movie-info__name">{name}</span>
      <img src={poster} alt="" />
      <div className="movie-info">
        <div className="movie-info__age-rating">
          <span>{age_rating}+</span>
        </div>
        {genres.map((item, index) => (
          <div className="movie-info__genre" key={`${item}_${index}`}>
            {item}
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieItem;
