import React, { Component } from 'react';
import { Form, Item, Input, Label, Icon } from 'native-base';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    num: 0,
    username: '',
    password: '',
    statusTextBox: {
      username: false,
      password: false,
      message: ''
    }
  };

  handleCount = () => {
    const { num } = this.state;
    this.setState({
      num: num + 1
    });
  };

  handleLogin = () => {
    const { username, password, statusTextBox } = this.state;
    const body = {
      username,
      password
    };

    axios
      .post('http://127.0.0.1:3001/auth/login', qs.stringify(body))
      .then(response => {
        if (response.status === 200) {
          this.props.setDataLogin(response.data.data);
          this.props.navigation.navigate('App');
        }
      })
      .catch(err => {
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

  handleRegister = () => {
    this.props.navigation.navigate('Register');
  };

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };
  render() {
    const { username, password, statusTextBox } = this.state;
    return (
      <View style={styles.bgColorSet}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Form>
              <Image
                source={require('../../Public/Assets/image/logo.png')}
                style={styles.imgLogo}
              />
              <Text style={{ alignSelf: 'center' }}>
                Please Login To Your Account
              </Text>
              <Item error={statusTextBox.username} inlineLabel>
                <Input
                  onChangeText={text => this.handleInput(text, 'username')}
                  value={username}
                  placeholder={statusTextBox.message || 'Username'}
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
            </Form>
            <TouchableOpacity onPress={this.handleLogin}>
              <View style={styles.button}>
                <Text style={styles.text}>Login</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.orText}>
              <Text>Or</Text>
            </View>
            <TouchableOpacity onPress={this.handleRegister}>
              <View style={styles.button}>
                <Text style={styles.text}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

// export default Login;

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  setDataLogin: payload => {
    dispatch({
      type: 'POST_LOGIN_FULLFILED',
      payload
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: '#669999',
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
    padding: 16
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
