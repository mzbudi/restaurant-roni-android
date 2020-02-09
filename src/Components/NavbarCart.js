import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Input, Item } from 'native-base';
import cart from '../Public/Assets/icon/cart.png';

class NavbarCart extends Component {
  turnBackDrawer = () => {
    this.props.draw();
  };
  render() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => {
            this.turnBackDrawer();
          }}>
          <Image
            style={styles.imageProfile}
            source={{
              uri:
                'https://doktersehat.com/wp-content/uploads/2018/11/kopi-doktersehat.jpg'
            }}
          />
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
  searchBar: { flex: 3, marginLeft: 8 }
};

export default NavbarCart;
