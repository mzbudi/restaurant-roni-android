import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import { emptyCart } from '../Public/redux/action/cart';
import { API_HOST } from 'react-native-dotenv';

class NavbarCart extends Component {
  turnBackDrawer = () => {
    this.props.draw();
  };
  handleEmptyCart = () => {
    this.props.dispatch(emptyCart());
  };
  render() {
    const { auth, users } = this.props;
    return (
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => {
            this.turnBackDrawer();
          }}>
          {users.profile_picture === '' ? (
            <Image
              style={styles.imageProfile}
              source={require('../Public/Assets/image/EP.png')}
            />
          ) : (
            <Image
              style={styles.imageProfile}
              source={{
                uri: `${API_HOST}` + users.profile_picture.replace('assets', '')
              }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            flex: 2,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18
          }}>
          Your Cart
        </Text>
        <TouchableOpacity onPress={() => this.handleEmptyCart()}>
          <Icon type="AntDesign" name="delete" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  navBar: {
    backgroundColor: '#669999',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    elevation: 15
  },
  imageProfile: {
    height: 50,
    width: 50,
    borderRadius: 180
  },
  imageCart: {
    height: 40,
    width: 40
  },
  searchBar: { flex: 3, marginLeft: 8 }
};

export default NavbarCart;
