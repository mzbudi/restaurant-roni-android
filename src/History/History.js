import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Drawer,
  Button,
  Left,
  Right,
  Body,
  Icon
} from 'native-base';
import { connect } from 'react-redux';
import NavbarHistory from '../Components/NavbarHistory';
import SideBarCart from '../Components/SideBarCart';
import { getHistory } from '../Public/redux/action/history';
import Moment from 'moment';

const dummies = [
  {
    id: 1,
    invoice: 123123,
    cashier_name: 'Dian',
    price: 10000,
    date_created: '20/20/20'
  },
  {
    id: 2,
    invoice: 123123,
    cashier_name: 'Dian',
    price: 10000,
    date_created: '20/20/20'
  },
  {
    id: 3,
    invoice: 123123,
    cashier_name: 'Dian',
    price: 10000,
    date_created: '20/20/20'
  }
];

class History extends Component {
  static navigationOptions = {
    header: null,
    headerShown: false
  };

  componentDidMount() {
    const { auth } = this.props;
    const header = {
      headers: { authorization: auth.data.token }
    };

    const id = auth.data.user_id;
    this.props.dispatch(getHistory(id, header));
  }
  render() {
    const { history } = this.props;
    return (
      <Container style={styles.backgroundContainer}>
        <NavbarHistory />
        {history.dataHistory.length === 0 ? (
          <Text>Belom ada Data</Text>
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
                    <Text>Order Id : {item.order_id}</Text>
                    <Text>Invoice : {item.invoice_number}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text>PPn : {item.PPn}</Text>
                    <Text>SubTotal: {item.subTotal}</Text>
                  </View>

                  <Text style={{ flex: 1 }}>
                    {String(Moment(item.created_at).format('MMMM Do YYYY'))}
                  </Text>

                  <Icon type="Feather" name="chevrons-right" />
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
