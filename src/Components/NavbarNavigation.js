import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Input, Item, Badge, Text } from 'native-base';
import cartImg from '../Public/Assets/icon/cart.png';
import { requestProducts } from '../Home/action';
import { API_HOST } from 'react-native-dotenv';

class NavbarNavigation extends Component {
  turnBackDrawer = () => {
    this.props.draw();
  };

  handleInput = text => {
    this.props.input(text);
  };

  handleCart = () => {
    this.props.navigation.navigate('Cart');
  };
  render() {
    const { cart, users } = this.props;
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
        <Item style={styles.searchBar}>
          <Input
            onChangeText={text => this.handleInput(text)}
            placeholder="Search . . ."
          />
        </Item>
        <TouchableOpacity
          onPress={() => {
            this.handleCart();
          }}>
          <Image style={styles.imageCart} source={cartImg} />
          {cart.cartData.length !== 0 ? (
            <Badge danger style={styles.cartBadge}>
              <Text>{cart.cartData.length}</Text>
            </Badge>
          ) : (
            <Text />
          )}
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
    alignItems: 'center'
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
  searchBar: { flex: 3, marginLeft: 8 },
  cartBadge: { position: 'absolute', left: 20, top: 20 }
};

export default NavbarNavigation;
