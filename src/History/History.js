import React, { Component } from 'react';
import { Form, Item, Input, Label, Icon } from 'native-base';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';

class History extends Component {
  //   state = {
  //     num: 0,
  //     username: '',
  //     password: '',
  //     statusTextBox: {
  //       username: false,
  //       password: false,
  //       message: ''
  //     }
  //   };

  //   handleCount = () => {
  //     const { num } = this.state;
  //     this.setState({
  //       num: num + 1
  //     });
  //   };

  //   handleRegister = () => {
  //     const { username, password, statusTextBox } = this.state;
  //     const body = {
  //       username,
  //       password
  //     };

  //     axios
  //       .post('http://127.0.0.1:3001/auth/login', qs.stringify(body))
  //       .then(response => {
  //         if (response.status === 200) {
  //           this.props.setDataLogin(response.data.data);
  //           this.props.navigation.navigate('App');
  //         }
  //       })
  //       .catch(() => {
  //         this.setState({
  //           statusTextBox: {
  //             ...statusTextBox,
  //             username: true,
  //             password: true,
  //             message: 'This Field Must be Filled'
  //           }
  //         });
  //       });
  //   };

  //   handleRegister = () => {
  //     this.props.navigation.navigate('Register');
  //   };

  //   handleBack = () => {
  //     this.props.navigation.navigate('Login');
  //   };

  //   handleInput = (text, type) => {
  //     this.setState({ [type]: text });
  //   };
  render() {
    return (
      <View>
        <Text>History</Text>
      </View>
    );
  }
}

// export default Register;

// const mapStateToProps = state => {
//   return {
//     auth: state.auth
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   setDataRegister: payload => {
//     dispatch({
//       type: 'POST_Register_FULLFILED',
//       payload
//     });
//   }
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Register);

export default History;
