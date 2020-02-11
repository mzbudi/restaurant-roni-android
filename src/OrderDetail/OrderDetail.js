import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import NavbarHistory from '../Components/NavbarHistory';
import { getDetailHistory } from '../Public/redux/action/orderDetail';

class OrderDetail extends Component {
  static navigationOptions = {
    header: null,
    headerShown: false
  };

  componentDidMount() {
    const { auth, navigation } = this.props;
    const header = {
      headers: { authorization: auth.data.token }
    };

    const id = navigation.state.params.item.order_id;
    this.props.dispatch(getDetailHistory(id, header));
  }

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

  render() {
    const { orderDetail, navigation, products } = this.props;
    return (
      <Container style={styles.backgroundContainer}>
        <NavbarHistory nameData={'Order Detail'} />
        {orderDetail.dataHistory.length === 0 ? (
          <Text>Belum ada Data</Text>
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              elevation: 15,
              margin: 16,
              padding: 16,
              borderRadius: 8,
              marginBottom: 0,
              flexDirection: 'row'
            }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Text>Order Id :{navigation.state.params.item.order_id}</Text>
                <Text>
                  Invoice :{orderDetail.dataHistory[0].invoice_number}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginHorizontal: 0,
                  marginVertical: 10
                }}
              />
              <FlatList
                data={orderDetail.dataHistory}
                keyExtractor={item => item.product_id}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                      <Text style={{ width: 100 }}>
                        {products.dataProducts.map((data, i) => {
                          if (data.product_id === item.product_id) {
                            return data.product_name;
                          }
                        })}
                      </Text>
                      <Text>Rp. {this.formatRupiah(item.product_price)}</Text>
                      <Text>{item.quantity}</Text>
                      <Text>Rp. {this.formatRupiah(item.subTotal)}</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginHorizontal: 0,
                  marginVertical: 10
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <View>
                  <Text>Total :</Text>
                  <Text>PPn :</Text>
                  <Text style={{ fontWeight: 'bold' }}>SubTotal:</Text>
                </View>
                <View>
                  <Text>
                    Rp.{' '}
                    {this.formatRupiah(navigation.state.params.item.subTotal)}
                  </Text>
                  <Text>
                    Rp. {this.formatRupiah(navigation.state.params.item.PPn)}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Rp.{' '}
                    {this.formatRupiah(
                      parseInt(navigation.state.params.item.subTotal) +
                        parseInt(navigation.state.params.item.PPn)
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </Container>
    );
  }
}
const styles = {
  buttonChangeProfile: {
    margin: 16,
    backgroundColor: '#ff5c33',
    borderRadius: 8,
    alignItems: 'center'
  },
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
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
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
  }
};

// export default Register;

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    cart: state.cart,
    history: state.history,
    orderDetail: state.orderDetail
  };
};

export default connect(mapStateToProps)(OrderDetail);
