import { combineReducers } from 'redux';
import auth from '../../Auth/reducer';
import products from '../../Home/reducer';
import cart from './reducers/cart';
import category from './reducers/category';

export default combineReducers({
  auth,
  products,
  cart,
  category
});
