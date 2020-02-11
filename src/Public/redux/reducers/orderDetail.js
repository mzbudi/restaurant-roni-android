const initialState = {
  dataHistory: [],
  isLoading: false
};

const orderDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY_DETAIL_PENDING':
      return {
        ...state
      };
    case 'GET_HISTORY_DETAIL_REJECTED':
      return {
        ...state
      };
    case 'GET_HISTORY_DETAIL_FULFILLED':
      return {
        isLoading: true,
        dataHistory: action.payload.data.data
      };
    default:
      return state;
  }
};

export default orderDetail;
