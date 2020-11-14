import axios from 'axios';

export const fetchFilm = (filmId) => (dispatch) => {
  axios.get(`http://localhost:3001/films/${filmId}`).then(({ data }) => {
    dispatch(setActiveFilm(data));
  });
};

export const setActiveFilm = (film) => ({
  type: 'SET_ACTIVE_FILM',
  payload: film,
});

export const setActiveDate = (date) => ({
  type: 'SET_ACTIVE_DATE',
  payload: date,
});

export const setActiveTime = (time) => ({
  type: 'SET_ACTIVE_TIME',
  payload: time,
});

export const addSelectedTicket = (place, price) => ({
  type: 'ADD_SELECTED_TICKET',
  payload: { place, price },
});

export const removeSelectedTicket = (place, price) => ({
  type: 'REMOVE_SELECTED_TICKET',
  payload: { place, price },
});

export const clearSelectedTickets = () => ({
  type: 'CLEAR_SELECTED_TICKETS',
});

export const clearState = () => ({
  type: 'CLEAR_STATE',
});
