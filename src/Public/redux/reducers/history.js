const initialState = {
  dataHistory: []
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY_PENDING':
      return {
        ...state
      };
    case 'GET_HISTORY_REJECTED':
      return {
        ...state
      };
    case 'GET_HISTORY_FULFILLED':
      return {
        ...state,
        dataHistory: action.payload.data.data
      };
    default:
      return state;
  }
};

export default history;
