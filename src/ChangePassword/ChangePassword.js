import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Form, Item, Input, Label, Toast } from 'native-base';
import { connect } from 'react-redux';
import ModalChangePassword from '../Components/ModalChangePassword';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
      visible: false
    };
  }
  static navigationOptions = {
    header: null,
    headerShown: false
  };
  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };

  handleReset = () => {
    this.setState({
      oldPassword: '',
      newPassword: '',
      rePassword: ''
    });
  };

  handleCloseModal = () => {
    this.setState({
      visible: false
    });
  };

  handleChangeSucces = res => {
    this.setState({
      visible: false
    });
    if (res.value.data.data.message === 'Password Changed') {
      Toast.show({
        text: res.value.data.data.message,
        buttonText: 'Okay',
        type: 'success',
        duration: 5000
      });
      this.handleReset();
    } else {
      Toast.show({
        text: res.value.data.data.message,
        buttonText: 'Okay',
        type: 'danger',
        duration: 5000
      });
    }
  };

  handleChangeFailed = () => {
    this.setState({
      visible: false
    });
    Toast.show({
      text: 'Change Failed',
      buttonText: 'Okay',
      type: 'danger',
      duration: 5000
    });
  };

  handleChangePassword = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const { oldPassword, newPassword, rePassword } = this.state;
    return (
      <Container style={styles.backgroundContainer}>
        <View style={styles.profilePic}>
          <Text style={styles.profileText}>Change Password</Text>
        </View>
        <View style={styles.formProfile}>
          <Text
            style={{
              fontSize: 16,
              margin: 16,
              alignSelf: 'center',
              textAlign: 'center'
            }}>
            Fill The Form Bellow To Change Password
          </Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginHorizontal: 0,
              marginVertical: 10
            }}
          />
          <Form>
            <Item fixedLabel>
              <Label>Old Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.handleInput(text, 'oldPassword')}
                value={oldPassword}
              />
            </Item>
            <Item fixedLabel>
              <Label>New Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.handleInput(text, 'newPassword')}
                value={newPassword}
              />
            </Item>
            <Item fixedLabel last>
              <Label>Re-Type Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.handleInput(text, 'rePassword')}
                value={rePassword}
              />
            </Item>
          </Form>
          <TouchableOpacity
            style={styles.buttonChangeProfile}
            onPress={() => {
              this.handleChangePassword();
            }}>
            <View>
              <Text style={styles.text}>Submit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonChangeProfile}
            onPress={() => {
              this.handleReset();
            }}>
            <View>
              <Text style={styles.text}>Reset</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ModalChangePassword
          onRequestClose={this.handleCloseModal.bind(this)}
          succesChange={this.handleChangeSucces.bind(this)}
          failedChange={this.handleChangeFailed.bind(this)}
          visible={this.state.visible}
          oldPassword={oldPassword}
          newPassword={newPassword}
          rePassword={rePassword}
          // cartCheckout={cart.cartData}
          {...this.props}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(ChangePassword);

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
    margin: 16,
    padding: 16
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
    alignItems: 'center',
    elevation: 15
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
