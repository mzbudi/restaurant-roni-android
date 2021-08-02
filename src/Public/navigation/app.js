import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../Home';
import History from '../../History';
import Profile from '../../Profile';
import Cart from '../../Cart';
import OrderDetail from '../../OrderDetail';
import ChangePassword from '../../ChangePassword/';
import ChangeProfile from '../../ChangeProfile/';

export default createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false }
  },
  History: {
    screen: History,
    navigationOptions: { headerShown: false }
  },
  Profile: {
    screen: Profile,
    navigationOptions: { headerShown: false }
  },
  Cart: {
    screen: Cart,
    navigationOptions: { headerShown: false }
  },
  OrderDetail: {
    screen: OrderDetail,
    navigationOptions: { headerShown: false }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: { headerShown: false }
  },
  ChangeProfile: {
    screen: ChangeProfile,
    navigationOptions: { headerShown: false }
  }
});
