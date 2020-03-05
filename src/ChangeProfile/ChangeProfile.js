import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Container, Form, Item, Input, Label, Icon, Toast } from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import ModalChangeProfile from '../Components/ModalChangeProfile';
import { getProfile } from '../Public/redux/action/users';
import { API_HOST } from 'react-native-dotenv';

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: null,
      visible: false,
      textName: false,
      message: ''
    };
  }
  static navigationOptions = {
    header: null,
    headerShown: false
  };

  componentDidMount() {
    const { auth } = this.props;
    const headers = { authorization: auth.data.token };
    const user_id = auth.data.user_id;
    const configCategory = {
      headers
    };
    this.props.dispatch(getProfile(user_id, configCategory));
  }

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };

  handleReset = () => {
    this.setState({
      name: '',
      photo: null,
      textName: false,
      message: ''
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
    if (res.value.data.data.message === 'Profile Changed') {
      Toast.show({
        text: res.value.data.data.message,
        buttonText: 'Okay',
        type: 'success',
        duration: 5000
      });
      const { auth } = this.props;
      const headers = { authorization: auth.data.token };
      const user_id = auth.data.user_id;
      const configCategory = {
        headers
      };
      this.props.dispatch(getProfile(user_id, configCategory));
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

  handleChangeProfile = () => {
    const { name } = this.state;
    if (name === '') {
      this.setState({
        textName: true,
        message: 'Must be Filled'
      });
    } else {
      this.setState({
        visible: true
      });
    }
  };

  handleChoosePhoto = () => {
    const options = {
      storageOptions: {
        quality: 0.8,
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
        this.setState({
          photo: response
        });
      }
    });
  };

  render() {
    const { auth, users } = this.props;
    const { name, photo, textName, message } = this.state;
    return (
      <Container style={styles.backgroundContainer}>
        <View style={styles.profilePic}>
          <Text style={styles.profileText}>Change Profile</Text>
          {auth.data.profile_picture === '' ? (
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
          <Text
            style={{
              fontSize: 16,
              margin: 16,
              alignSelf: 'center',
              textAlign: 'center'
            }}>
            Fill The Form To Change Profile
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
            <Item fixedLabel error={textName}>
              <Label>New Name : </Label>
              <Input
                onChangeText={text => this.handleInput(text, 'name')}
                value={name}
                placeholder={message}
              />
            </Item>
            <Item>
              <TouchableOpacity onPress={this.handleChoosePhoto}>
                <Icon type="FontAwesome" name="camera" />
              </TouchableOpacity>
              <Input
                placeholder={
                  photo !== null
                    ? this.state.photo.fileName
                    : 'Choose a Picture'
                }
                disabled
              />
            </Item>
          </Form>
          <TouchableOpacity
            style={styles.buttonChangeProfile}
            onPress={() => {
              this.handleChangeProfile();
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
        <ModalChangeProfile
          onRequestClose={this.handleCloseModal.bind(this)}
          succesChange={this.handleChangeSucces.bind(this)}
          failedChange={this.handleChangeFailed.bind(this)}
          visible={this.state.visible}
          photo={photo}
          name={name}
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
    cart: state.cart,
    users: state.users
  };
};

export default connect(mapStateToProps)(ChangeProfile);

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
    height: 80,
    width: 80,
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
