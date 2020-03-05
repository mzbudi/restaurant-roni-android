import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Text, Toast } from 'native-base';
import { changePassword, changeProfile } from '../Public/redux/action/users';

class ModalChangeProfile extends Component {
  handleClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  handleChangeSucces(res) {
    if (this.props.succesChange) {
      this.props.succesChange(res);
    }
  }

  handleChangeFailed() {
    if (this.props.failedChange) {
      this.props.failedChange();
    }
  }

  handleChangeProfile = () => {
    const { auth, photo, name } = this.props;
    const header = {
      headers: { authorization: auth.data.token }
    };

    const user_id = auth.data.user_id;
    let body = new FormData();
    body.append('name', name);
    if (photo !== null) {
      if (photo.fileSize > 5120000) {
        Toast.show({
          text: 'File Too Large, Max Size 5 MB',
          buttonText: 'Okay',
          type: 'danger',
          duration: 5000
        });
      } else {
        body.append('profile_picture', {
          uri: photo.uri,
          type: photo.type,
          name: photo.fileName
        });
      }
    } else {
      body.append('photo', photo);
    }

    this.props
      .dispatch(changeProfile(user_id, body, header))
      .then(res => {
        this.handleChangeSucces(res);
      })
      .catch(err => {
        this.handleChangeFailed(err);
      });
  };
  render() {
    return (
      <Modal transparent animationType={'fade'} {...this.props}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => this.handleClose()}>
            <View style={styles.backdrop} />
          </TouchableOpacity>
          <View style={styles.innerContainer}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={() => this.handleClose()}>
                <Icon name="close" type="MaterialIcons" />
              </TouchableOpacity>
            </View>
            <View>
              <Text>Are You Sure Want to Change Profile Information?</Text>
            </View>
            <TouchableOpacity onPress={() => this.handleChangeProfile()}>
              <View style={styles.button}>
                <Text style={styles.text}>Change it!</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.handleClose()}>
              <View style={styles.button}>
                <Text style={styles.text}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(ModalChangeProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100%'
  },
  innerContainer: {
    backgroundColor: '#FFF',
    padding: 16
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  backdrop: {
    flexDirection: 'column',
    height: '100%'
  },
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
  }
});
