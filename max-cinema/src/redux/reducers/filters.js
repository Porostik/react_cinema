import moment from "moment";

const initialState = {
  genres: [],
  date: moment().format(),
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
