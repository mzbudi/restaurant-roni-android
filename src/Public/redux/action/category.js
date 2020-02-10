import axios from 'axios';
// import qs from 'qs'

import { API_HOST } from 'react-native-dotenv';

export const requestCategory = headers => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(`${API_HOST}/category`, headers)
  };
};
