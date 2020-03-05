import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Drawer, Button, Toast } from 'native-base';
import NavbarCart from '../Components/NavbarCart';
import SideBarCart from '../Components/SideBarCart';
import { connect } from 'react-redux';
import {
  removeCart,
  incrementCart,
  decrementCart,
  emptyCart
} from '../Public/redux/action/cart';
import ModalCheckout from '../Components/ModalCheckout';
import { API_HOST } from 'react-native-dotenv';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  static navigationOptions = {
    header: null,
    headerShown: false
  };

  handleCloseModal = () => {
    this.setState({
      visible: false
    });
  };

  handleCheckoutSucces = () => {
    this.setState({
      visible: false
    });
    Toast.show({
      text: 'Transaction Succes',
      buttonText: 'Okay',
      type: 'success',
      duration: 5000
    });
    this.props.dispatch(emptyCart());
  };

  handleCheckoutFailed = () => {
    this.setState({
      visible: false
    });
    Toast.show({
      text: 'Transaction Failed',
      buttonText: 'Okay',
      type: 'danger',
      duration: 5000
    });
  };

  formatRupiah = (angka, prefix) => {
    let number_string = angka.toString().replace(/[^,\d]/g, '');
    let split = number_string.split(',');
    let remains = split[0].length % 3;
    let rupiah = split[0].substr(0, remains);
    let thausand = split[0].substr(remains).match(/\d{3}/gi);

    if (thausand) {
      let separator = remains ? '.' : '';
      rupiah += separator + thausand.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  };

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }

  handleRemove = item => {
    this.props.dispatch(removeCart(item));
  };

  handleIncrement = id => {
    this.props.dispatch(incrementCart(id));
  };

  handleDecrement = id => {
    this.props.dispatch(decrementCart(id));
  };

  handleCheckout = () => {
    this.setState({
      visible: true
    });
  };
  render() {
    const { cart } = this.props;
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBarCart {...this.props} navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container style={styles.backgroundContainer}>
          <NavbarCart draw={this.openDrawer.bind(this)} {...this.props} />
          {cart.cartData.length === 0 ? (
            <View style={styles.viewImageCart}>
              <Image
                source={require('../Public/Assets/image/empty-cart.png')}
                style={styles.imgEmptyCart}
              />
            </View>
          ) : (
            <FlatList
              data={cart.cartData}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {
                const product_image_fixed =
                  `${API_HOST}` + item.product_image.replace('assets', '');
                return (
                  <View style={styles.viewFlatList}>
                    <View style={styles.viewFlatImage}>
                      <Image
                        style={styles.flatListImage}
                        source={{
                          uri: product_image_fixed
                        }}
                      />
                      <Text>{item.product_name}</Text>
                      <Text>Rp.{this.formatRupiah(item.product_price)}</Text>
                    </View>
                    <Content>
                      <View style={styles.contentFlatList}>
                        <Button
                          style={styles.buttonFlatList}
                          onPress={() => {
                            this.handleDecrement(item.product_id);
                          }}
                          disabled={item.quantity === 1 ? true : false}>
                          <Text>-</Text>
                        </Button>
                        <Content>
                          <Text style={styles.contentText}>
                            {item.quantity}
                          </Text>
                        </Content>
                        <Button
                          style={styles.buttonFlatList}
                          onPress={() => {
                            this.handleIncrement(item.product_id);
                          }}>
                          <Text>+</Text>
                        </Button>
                      </View>
                      <Text style={styles.totalPrice}>
                        Rp.{this.formatRupiah(item.totalPrice)}
                      </Text>
                    </Content>
                    <Button
                      style={styles.buttonRemove}
                      onPress={() => {
                        this.handleRemove(item);
                      }}>
                      <Text>X</Text>
                    </Button>
                  </View>
                );
              }}
            />
          )}
          {cart.cartData.length === 0 ? null : (
            <React.Fragment>
              <View style={styles.checkoutArea}>
                <View style={styles.grandTotalArea}>
                  <View>
                    <Text>Total :</Text>
                    <Text>PPn :</Text>
                    <Text style={styles.fontBold}>Grand Total :</Text>
                  </View>
                  <View>
                    <Text>Rp.{this.formatRupiah(cart.grandTotal)}</Text>
                    <Text>Rp.{this.formatRupiah(cart.grandTotal * 0.1)}</Text>
                    <Text style={styles.fontBold}>
                      Rp.
                      {this.formatRupiah(
                        cart.grandTotal + cart.grandTotal * 0.1
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonChangeProfile}
                onPress={() => {
                  this.handleCheckout();
                }}>
                <View>
                  <Text style={styles.text}>Checkout</Text>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          )}
          <ModalCheckout
            onRequestClose={this.handleCloseModal.bind(this)}
            succesCheckout={this.handleCheckoutSucces.bind(this)}
            failedCheckout={this.handleCheckoutFailed.bind(this)}
            visible={this.state.visible}
            cartCheckout={cart.cartData}
            {...this.props}
          />
        </Container>
      </Drawer>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    cart: state.cart,
    users: state.users
  };
};

export default connect(mapStateToProps)(Cart);

const styles = {
  buttonChangeProfile: {
    margin: 16,
    backgroundColor: '#ff5c33',
    borderRadius: 8,
    alignItems: 'center'
  },
  fontBold: { fontWeight: 'bold' },
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
  },
  imgEmptyCart: {
    width: 300,
    height: 250
  },
  imageCartDiv: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  viewImageCart: {
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  viewFlatList: {
    backgroundColor: 'white',
    elevation: 15,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 0,
    flexDirection: 'row'
  },
  contentFlatList: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  contentText: {
    alignSelf: 'center',
    fontSize: 14
  },
  checkoutArea: {
    backgroundColor: 'white',
    elevation: 15,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 0
  },
  viewFlatImage: { marginLeft: 8, width: 80 },
  flatListImage: { height: 50, width: 50 },
  buttonFlatList: { padding: 16, backgroundColor: '#33ccff' },
  totalPrice: { alignSelf: 'center', margin: 16 },
  buttonRemove: { marginLeft: 8, padding: 16, backgroundColor: '#ff6666' },
  grandTotalArea: {
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};
