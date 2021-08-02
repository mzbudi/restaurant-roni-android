import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Text } from 'native-base';
import { createOrder } from '../Public/redux/action/cart';
import { changePassword } from '../Public/redux/action/users';

class ModalChangePassword extends Component {
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

  handleChangePassword = () => {
    const { auth, newPassword, rePassword, oldPassword } = this.props;
    const header = {
      headers: { authorization: `Bearer ${auth.data.token}` }
    };

    const user_id = auth.data.user_id;
    const body = {
      username: auth.data.username,
      password: oldPassword,
      new_password: newPassword,
      rePassword: rePassword,
      name: auth.data.name
    };

    this.props
      .dispatch(changePassword(user_id, body, header))
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
              <Text>Are You Sure Want to Change Password?</Text>
            </View>
            <TouchableOpacity onPress={() => this.handleChangePassword()}>
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

export default connect(mapStateToProps)(ModalChangePassword);

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
