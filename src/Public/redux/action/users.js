import axios from 'axios';

import { API_HOST } from 'react-native-dotenv';

export const changePassword = (id, body, headers) => {
  return {
    type: 'CHANGE_PASSWORD',
    payload: axios.put(`${API_HOST}/users/changePassword/${id}`, body, headers)
  };
};

export const changeProfile = (id, body, headers) => {
  return {
    type: 'CHANGE_PROFILE',
    payload: axios.put(`${API_HOST}/users/changeProfile/${id}`, body, headers)
  };
};

export const getProfile = (id, headers) => {
  return {
    type: 'GET_PROFILE',
    payload: axios.get(`${API_HOST}/users/profile/${id}`, headers)
  };
};
