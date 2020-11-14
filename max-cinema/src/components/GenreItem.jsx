import React from 'react';

const GenreItem = React.memo(function ({ genreName, onClick }) {
  return (
    <div className="genre__box">
      <input className="genre__input" type="checkbox" onChange={onClick} />
      <label>{genreName}</label>
    </div>
  );
});

export default GenreItem;
