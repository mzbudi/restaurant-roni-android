import axios from 'axios';
import { API_HOST } from 'react-native-dotenv';

export const getHistory = (id, headers) => {
  return {
    type: 'GET_HISTORY',
    payload: axios.get(`${API_HOST}/order/${id}`, headers)
  };
};
