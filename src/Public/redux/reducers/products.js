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
      if (action.payload.data.data.searchResult.length) {
        return {
          ...state,
          isLoading: true,
          dataProducts: [
            ...state.dataProducts,
            ...action.payload.data.data.searchResult
          ]
        };
      } else {
        return {
          ...state,
          isLoading: false
        };
      }
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
