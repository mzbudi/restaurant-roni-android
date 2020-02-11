import React, { Component } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Text, Toast } from 'native-base';
import { createOrder } from '../Public/redux/action/cart';

class ModalCheckout extends Component {
  handleClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
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
    this.props.dispatch(createOrder(body, header)).then(this.handleClose());
  };
  render() {
    const { cart } = this.props;
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
              {/* <FlatList
                data={cart.cartData}
                keyExtractor={item => item.product_id}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{item.product_name}</Text>
                      <Text>{item.product_price}</Text>
                      <Text>{item.quantity}</Text>
                      <Text>{item.totalPrice}</Text>
                    </View>
                  );
                }}
              /> */}
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
