const initialState = {
  dataProducts: [],
  message: '',
  isLoading: false
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state
      };
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state,
        message: 'Terjadi Kesalahan'
      };
    case 'GET_PRODUCTS_FULFILLED':
      return {
        ...state,
        dataProducts: [
          ...state.dataProducts,
          ...action.payload.data.data.searchResult
        ]
      };
    case 'EMPTY_PRODUCTS':
      return {
        ...state,
        dataProducts: []
      };
    default:
      return state;
  }
};

export default products;
