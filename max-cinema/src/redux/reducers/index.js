import { combineReducers } from 'redux';
import filmsReducer from './films';
import filterReducer from './filters';
import activeFilmReducer from './activeFilm';

const rootReducer = combineReducers({
  films: filmsReducer,
  filters: filterReducer,
  activeFilm: activeFilmReducer,
});

export default rootReducer;
