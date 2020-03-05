import axios from 'axios';
import qs from 'qs';
import { API_HOST } from 'react-native-dotenv';

export const requestLogin = body => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post(`${API_HOST}/auth/login`, qs.stringify(body))
  };
};

export const requestRegister = body => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post(`${API_HOST}/auth/register`, qs.stringify(body))
  };
};

export const requestLogout = () => {
  return {
    type: 'LOGOUT'
  };
};
