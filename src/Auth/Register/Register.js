import React, { Component } from 'react';
import { Form, Item, Input, Label, Icon } from 'native-base';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

class Register extends Component {
  state = {
    photo: null,
    username: '',
    password: '',
    name: '',
    statusTextBox: {
      username: false,
      password: false,
      message: ''
    },
    profile_picture: {}
  };

  static navigationOptions = {
    header: null,
    headerShown: false
  };

  handleChoosePhoto = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState(
          {
            photo: response
          },
          () => {
            console.log(response);
            console.log(this.state.photo);
          }
        );
      }
    });
  };

  handleRegister = () => {
    const { username, name, password, statusTextBox, photo } = this.state;
    let body = new FormData();
    console.log(photo);
    body.append('username', username);
    body.append('name', name);
    body.append('password', password);
    body.append('profile_picture', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName
    });

    axios
      .post('http://127.0.0.1:3001/auth/register', body)
      .then(response => {
        if (response.status === 200) {
          console.log('berhasil');
        }
      })
      .catch(() => {
        this.setState({
          statusTextBox: {
            ...statusTextBox,
            username: true,
            password: true,
            message: 'This Field Must be Filled'
          }
        });
      });
  };

  handleBack = () => {
    this.props.navigation.navigate('Login');
  };

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };
  render() {
    const { username, password, statusTextBox, name } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Form>
            <Image
              source={require('../../Public/Assets/image/logo.png')}
              style={styles.imgLogo}
            />
            <Text style={{ alignSelf: 'center' }}>
              Please Register Your Account
            </Text>
            <Item error={statusTextBox.username} inlineLabel>
              <Input
                onChangeText={text => this.handleInput(text, 'username')}
                value={username}
                placeholder={statusTextBox.message || 'Username'}
              />
            </Item>
            <Item error={statusTextBox.username} inlineLabel>
              <Input
                onChangeText={text => this.handleInput(text, 'name')}
                value={name}
                placeholder={statusTextBox.message || 'Name'}
              />
            </Item>
            <Item error={statusTextBox.password}>
              <Input
                secureTextEntry
                onChangeText={text => this.handleInput(text, 'password')}
                value={password}
                placeholder={statusTextBox.message || 'Password'}
              />
            </Item>
            <Item>
              <TouchableOpacity onPress={this.handleChoosePhoto}>
                <Icon type="FontAwesome" name="camera" />
              </TouchableOpacity>
              <Input placeholder="Choose a Picture" />
            </Item>
          </Form>
          <TouchableOpacity onPress={this.handleRegister}>
            <View style={styles.button}>
              <Text style={styles.text}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleBack}>
            <View style={styles.buttonBack}>
              <Text style={styles.text}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// export default Register;

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  setDataRegister: payload => {
    dispatch({
      type: 'POST_Register_FULLFILED',
      payload
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: '#669999',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },

  buttonBack: {
    marginTop: 16,
    backgroundColor: '#ff5c33',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },

  text: {
    margin: 16,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  textNum: {
    fontSize: 30,
    alignSelf: 'center'
  },

  container: {
    padding: 16,
    backgroundColor: '#ffb380',
    flex: 1,
    justifyContent: 'center'
  },

  card: {
    backgroundColor: '#ffb380',
    // elevation: 15,
    padding: 16,
    borderRadius: 8
  },

  imgLogo: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 0
  },

  bgColorSet: {
    backgroundColor: '#ffb380',
    flex: 1,
    justifyContent: 'center'
  },
  orText: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 0
  }
});
