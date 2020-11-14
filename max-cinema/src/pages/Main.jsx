import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { DateFilter, GenreFilter, MovieItem } from '../components';

import { useDispatch, useSelector } from 'react-redux';
import { setGenres, setDate } from '../redux/actions/filters';
import { fetchFilms } from '../redux/actions/films';

const availableGenres = ['боевик', 'приключения', 'драма', 'комедия', 'ужасы', 'триллер', 'экшн'];

function Main() {
  const dispatch = useDispatch();
  const items = useSelector(({ films }) => films.items);
  const { genres } = useSelector(({ filters }) => ({
    genres: filters.genres,
  }));

  const { date } = useSelector(({ filters }) => ({
    date: filters.date,
  }));

  const onSetGenres = React.useCallback((genres) => {
    dispatch(setGenres(genres));
  }, []);

  const onSetDate = React.useCallback((date) => {
    dispatch(setDate(date));
  }, []);

  React.useEffect(() => {
    dispatch(fetchFilms(genres, moment(date).format().split('T')[0]));
  }, [genres, date]);

  return (
    <div>
      <div className="main-content">
        <div className="container">
          <div className="main-content__content">
            <div className="main-content__filter-bar">
              <DateFilter changeDate={onSetDate} date={date} />
              <GenreFilter availableGenres={availableGenres} onSetGenres={onSetGenres} />
            </div>
            <div className="movies">
              {items &&
                items.map((item) => (
                  <Link
                    key={item._id}
                    className="movies__item"
                    to={{ pathname: `/${item.name}`, id: item._id }}>
                    <MovieItem {...item} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
