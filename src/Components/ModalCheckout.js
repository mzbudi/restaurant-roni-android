import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Text } from 'native-base';
import { createOrder } from '../Public/redux/action/cart';

class ModalCheckout extends Component {
  handleClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  handleCheckoutSucces() {
    if (this.props.succesCheckout) {
      this.props.succesCheckout();
    }
  }

  handleCheckoutFailed() {
    if (this.props.failedCheckout) {
      this.props.failedCheckout();
    }
  }

  handleCheckout = () => {
    const { auth, cart } = this.props;
    const header = {
      headers: { authorization: auth.data.token }
    };

    const body = {
      user_id: auth.data.user_id,
      orders: cart.cartData
    };
    // console.log(body, header);
    this.props
      .dispatch(createOrder(body, header))
      .then(res => {
        this.handleCheckoutSucces(res);
      })
      .catch(err => {
        this.handleCheckoutFailed(err);
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
              <Text>Are You Sure Want to Proceed This Order?</Text>
            </View>
            <TouchableOpacity onPress={() => this.handleCheckout()}>
              <View style={styles.button}>
                <Text style={styles.text}>Checkout</Text>
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

export default connect(mapStateToProps)(ModalCheckout);

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
