import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ProfileField from '../Components/ProfileField';
import { API_HOST } from 'react-native-dotenv';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'roni'
    };
  }

  handleChangePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  handleChangeProfile = () => {
    this.props.navigation.navigate('ChangeProfile');
  };

  render() {
    const { auth, users } = this.props;
    return (
      <Container style={styles.backgroundContainer}>
        <View style={styles.profilePic}>
          <Text style={styles.profileText}>Profile</Text>
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
        </View>
        <View style={styles.formProfile}>
          <ProfileField userData={auth.data} name={users.name} />
        </View>
        <TouchableOpacity
          style={styles.buttonChangeProfile}
          onPress={() => {
            this.handleChangeProfile();
          }}>
          <View>
            <Text style={styles.text}>Change Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonChangeProfile}
          onPress={() => {
            this.handleChangePassword();
          }}>
          <View>
            <Text style={styles.text}>Change Password</Text>
          </View>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category,
    cart: state.cart,
    users: state.users
  };
};

export default connect(mapStateToProps)(Profile);

const styles = {
  buttonChangeProfile: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: '#ff5c33',
    borderRadius: 8,
    alignItems: 'center'
  },
  formProfile: {
    backgroundColor: 'white',
    elevation: 15,
    borderRadius: 8,
    flexDirection: 'column',
    margin: 16
  },
  card: {
    backgroundColor: 'white',
    elevation: 15,
    margin: 10,
    borderRadius: 8,
    marginBottom: 0
  },
  image: {
    height: 80,
    width: 90,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  profilePic: {
    backgroundColor: '#669999',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    padding: 16,
    alignItems: 'center'
  },
  text: {
    margin: 16,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  container: {
    padding: 16
  },
  imageProfile: {
    height: 150,
    width: 150,
    borderRadius: 180,
    marginRight: 8
  },
  imageCart: {
    height: 40,
    width: 40
  },
  containerView: {
    paddingBottom: 80
  },
  backgroundContainer: { backgroundColor: '#669999' },
  buttonLogout: {
    backgroundColor: '#ff5c33'
  },
  profileText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16
  }
};
