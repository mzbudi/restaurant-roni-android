import axios from 'axios';
import { API_HOST } from 'react-native-dotenv';

export const getDetailHistory = (id, headers) => {
  return {
    type: 'GET_HISTORY_DETAIL',
    payload: axios.get(`${API_HOST}/order/history/${id}`, headers)
  };
};
