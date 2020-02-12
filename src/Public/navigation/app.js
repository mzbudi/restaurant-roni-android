import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../Home';
import History from '../../History';
import Profile from '../../Profile';
import Cart from '../../Cart';
import OrderDetail from '../../OrderDetail';
import ChangePassword from '../../ChangePassword/';
import ChangeProfile from '../../ChangeProfile/';

export default createStackNavigator({
  Home,
  History,
  Profile,
  Cart,
  OrderDetail,
  ChangePassword,
  ChangeProfile
});
