import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Right,
  Text,
  List,
  ListItem,
  Left,
  Icon
} from 'native-base';
import { Image, View } from 'react-native';

class NavbarSidebar extends Component {
  //   handleLink = link => {
  //     this.props.navigation.navigate(link);
  //   };

  //   handleLogout = () => {
  //     this.props.dispatch(requestLogout());
  //     this.props.navigation.navigate('Auth');
  //   };

  render() {
    return (
      <View style={styles.navBar}>
        <Image
          style={styles.imageProfile}
          source={{
            uri:
              'https://doktersehat.com/wp-content/uploads/2018/11/kopi-doktersehat.jpg'
          }}
        />
        <Text>Nama User</Text>
      </View>
    );
  }
}

export default NavbarSidebar;

const styles = {
  navBar: {
    backgroundColor: '#669999',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    padding: 16,
    alignItems: 'center'
  },
  imageProfile: {
    height: 50,
    width: 50,
    borderRadius: 180,
    marginRight: 8
  }
};
