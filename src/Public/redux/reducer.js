import { combineReducers } from 'redux';
import auth from '../../Auth/reducer';
import products from '../../Home/reducer';
import cart from './reducers/cart';
import category from './reducers/category';
import history from './reducers/history';
import orderDetail from './reducers/orderDetail';

export default combineReducers({
  auth,
  products,
  cart,
  category,
  history,
  orderDetail
});
