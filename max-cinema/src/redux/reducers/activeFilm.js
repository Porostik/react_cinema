import moment from 'moment';

const initialState = {
  film: {},
  selectedTickets: [],
  totalPrice: 0,
  totalCount: 0,
  activeTime: null,
  activeDate: moment(),
  isLoaded: false,
};

const activeFilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_FILM':
      return {
        ...state,
        film: action.payload,
        isLoaded: true,
      };
    case 'SET_ACTIVE_DATE':
      return {
        ...state,
        activeDate: action.payload,
      };
    case 'CLEAR_STATE':
      return {
        film: {},
        selectedTickets: [],
        totalPrice: 0,
        totalCount: 0,
        activeTime: null,
        activeDate: moment(),
        isLoaded: false,
      };
    case 'SET_ACTIVE_TIME':
      return {
        ...state,
        activeTime: action.payload,
      };
    case 'ADD_SELECTED_TICKET':
      const selectedTickets = [...state.selectedTickets, action.payload];
      const totalCount = selectedTickets.length;
      const totalPrice = selectedTickets.reduce((sum, item) => item.price + sum, 0);

      return {
        ...state,
        selectedTickets,
        totalCount,
        totalPrice,
      };
    case 'REMOVE_SELECTED_TICKET':
      const ticket = action.payload;
      const newSelectedTickets = state.selectedTickets.filter(
        (item) => item.place !== ticket.place,
      );
      const newTotalCount = newSelectedTickets.length;
      const newTotalPrice = newSelectedTickets.reduce((sum, item) => item.price + sum, 0);

      return {
        ...state,
        selectedTickets: newSelectedTickets,
        totalCount: newTotalCount,
        totalPrice: newTotalPrice,
      };
    case 'CLEAR_SELECTED_TICKETS':
      return {
        ...state,
        selectedTickets: [],
        totalPrice: 0,
        totalCount: 0,
      };
    default:
      return state;
  }
};

export default activeFilmReducer;
