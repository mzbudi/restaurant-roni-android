import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, Icon } from 'native-base';
import { connect } from 'react-redux';
import NavbarHistory from '../Components/NavbarHistory';
import { getHistory } from '../Public/redux/action/history';
import Moment from 'moment';

class History extends Component {
  componentDidMount() {
    const { auth } = this.props;
    const header = {
      headers: { authorization: `Bearer ${auth.data.token}` }
    };

    const id = auth.data.user_id;
    this.props.dispatch(getHistory(id, header));
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

  handleDetail = item => {
    this.props.navigation.navigate('OrderDetail', { item });
  };
  render() {
    const { history } = this.props;
    return (
      <Container style={styles.backgroundContainer}>
        <NavbarHistory />
        {history.dataHistory.length === 0 ? (
          <Text>Belum Ada Data</Text>
        ) : (
          <FlatList
            data={history.dataHistory}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              return (
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
                    <Text>Order Id : </Text>
                    <Text style={{ marginTop: 8 }}>Invoice :</Text>
                    <Text style={{ marginTop: 8 }}>SubTotal :</Text>
                    <Text style={{ marginTop: 8 }}>Date :</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginTop: 8 }}>{item.order_id}</Text>
                    <Text style={{ marginTop: 8 }}>{item.invoice_number}</Text>
                    <Text style={{ marginTop: 8 }}>
                      Rp.{' '}
                      {this.formatRupiah(
                        parseInt(item.subTotal) + parseInt(item.PPn)
                      )}
                    </Text>
                    <Text style={{ marginTop: 8 }}>
                      {String(Moment(item.created_at).format('MMMM Do YYYY'))}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.handleDetail(item);
                    }}>
                    <Icon type="Feather" name="chevrons-right" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
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
    history: state.history
  };
};

export default connect(mapStateToProps)(History);
