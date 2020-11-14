const initialState = {
  items: [],
};

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILMS':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default filmsReducer;
