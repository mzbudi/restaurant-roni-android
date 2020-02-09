import { combineReducers } from 'redux';
import auth from '../../Auth/reducer';
import products from '../../Home/reducer';

export default combineReducers({
  auth,
  products
});
