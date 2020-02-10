import axios from 'axios';
import { API_HOST } from 'react-native-dotenv';

export const addCart = data => {
  return {
    type: 'ADD_CART',
    data
  };
};

export const removeCart = data => {
  return {
    type: 'REMOVE_CART',
    data
  };
};

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART'
  };
};

export const incrementCart = id => {
  return {
    type: 'INCREMENT_CART',
    id
  };
};

export const decrementCart = id => {
  return {
    type: 'DECREMENT_CART',
    id
  };
};

export const createOrder = (body, headers) => {
  return {
    type: 'POST_CART',
    payload: axios.post(`${API_HOST}/order/`, body, headers)
  };
};
