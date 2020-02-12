import axios from 'axios';
import qs from 'qs';
import { API_HOST } from 'react-native-dotenv';

export const requestLogin = body => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post(`${API_HOST}/auth/login`, qs.stringify(body))
  };
};
export const requestLogout = () => {
  return {
    type: 'LOGOUT'
  };
};
