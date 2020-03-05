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
import { API_HOST } from 'react-native-dotenv';

class NavbarSidebar extends Component {
  //   handleLink = link => {
  //     this.props.navigation.navigate(link);
  //   };

  //   handleLogout = () => {
  //     this.props.dispatch(requestLogout());
  //     this.props.navigation.navigate('Auth');
  //   };

  render() {
    const { auth, users } = this.props;
    return (
      <View style={styles.navBar}>
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
        <Text>{auth.username}</Text>
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
