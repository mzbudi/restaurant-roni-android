import axios from 'axios';
// import qs from 'qs';

import { API_HOST } from 'react-native-dotenv';

export const requestProducts = config => {
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get(`${API_HOST}/products`, config)
  };
};

export const emptyProducts = () => {
  return {
    type: 'EMPTY_PRODUCTS'
  };
};
