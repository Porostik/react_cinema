import React from 'react';
import GenreItem from './GenreItem';

function GenreFilter({ availableGenres, onSetGenres }) {
  const [activeGenres, setActiveGenres] = React.useState([]);
  React.useEffect(() => {
    onSetGenres(activeGenres);
  }, [activeGenres]);

  const onSetGenre = (genre) => {
    if (activeGenres.includes(genre)) {
      setActiveGenres(activeGenres.filter((item) => item !== genre));
      return;
    }
    setActiveGenres((prev) => [...prev, genre]);
  };
  return (
    <div>
      <div className="genre__block">
        {availableGenres.map((item, index) => (
          <GenreItem key={`${item}_${index}`} genreName={item} onClick={() => onSetGenre(item)} />
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
