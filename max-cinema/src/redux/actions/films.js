import axios from 'axios';

export const fetchFilms = (genres, date) => (dispatch) => {
  let url = 'http://localhost:3001/films?';
  if (genres.length > 0) {
    genres.forEach((item) => {
      url = `${url}&genres=${item}`;
    });
  }
  url = `${url}&date=${date}`;
  axios.get(url).then(({ data }) => {
    dispatch(setFilms(data));
  });
};

export const setFilms = (items) => ({
  type: 'SET_FILMS',
  payload: items,
});
