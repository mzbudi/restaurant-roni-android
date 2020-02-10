import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import NavbarNavigation from '../Components/NavbarNavigation';
import CardProduct from '../Components/CardProduct';
import { requestProducts } from './action';
import { requestCategory } from '../Public/redux/action/category';
import { connect } from 'react-redux';
import SideBar from '../Components/SideBar';
import { Drawer, Button, Text } from 'native-base';
import CategoryPicker from '../Components/CategoryPicker';
import { addCart } from '../Public/redux/action/cart';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProducts: []
    };
  }

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }

  static navigationOptions = {
    header: null,
    headerShown: false
  };

  componentDidMount() {
    const { auth } = this.props;
    const headers = { authorization: auth.data.token };
    const configCategory = {
      headers
    };
    const config = {
      headers,
      params: {
        nameSearch: '',
        category_id: '',
        limit: '1000',
        page: 0,
        product_name: '',
        date: ''
      }
    };
    this.props.dispatch(requestProducts(config));
    this.props.dispatch(requestCategory(configCategory));
  }

  handleCategory = id => {
    const { auth } = this.props;
    const headers = { authorization: auth.data.token };
    const config = {
      headers,
      params: {
        nameSearch: '',
        category_id: id,
        limit: '1000',
        page: 0,
        product_name: '',
        date: ''
      }
    };
    this.props.dispatch(requestProducts(config));
  };

  handleSort = sorter => {
    const { auth } = this.props;
    const headers = { authorization: auth.data.token };
    let config = '';
    if (sorter === 'product_name') {
      config = {
        headers,
        params: {
          nameSearch: '',
          category_id: '',
          limit: '1000',
          page: 0,
          product_name: sorter,
          date: ''
        }
      };
    } else {
      config = {
        headers,
        params: {
          nameSearch: '',
          category_id: '',
          limit: '1000',
          page: 0,
          product_name: '',
          date: sorter
        }
      };
    }

    this.props.dispatch(requestProducts(config));
  };

  addToCart = item => {
    this.props.dispatch(addCart(item));
  };

  render() {
    const { products } = this.props;
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBar {...this.props} navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <View style={styles.backgroundContainer}>
          <NavbarNavigation {...this.props} draw={this.openDrawer.bind(this)} />
          <Text style={{ alignSelf: 'center', padding: 8 }}>
            Wellcome, Please Choose What You Want !
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginHorizontal: 16
            }}>
            <Button
              rounded
              success
              style={styles.buttonFilter}
              onPress={() => this.handleSort('product_name')}>
              <Text>Name</Text>
            </Button>
            <Button
              rounded
              success
              style={styles.buttonFilter}
              onPress={() => this.handleSort('updated_by')}>
              <Text>Newest</Text>
            </Button>
            <CategoryPicker {...this.props} />
          </View>
          <View style={styles.container}>
            <FlatList
              data={products.dataProducts}
              numColumns={2}
              keyExtractor={item => item.product_id}
              contentContainerStyle={styles.containerView}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.addToCart(item);
                    }}>
                    <CardProduct
                      product_image={item.product_image}
                      product_name={item.product_name}
                      product_price={item.product_price}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Drawer>
    );
  }
}

const styles = {
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
  navBar: {
    backgroundColor: '#669999',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 50,
    width: 50,
    borderRadius: 180
  },
  imageCart: {
    height: 40,
    width: 40
  },
  containerView: {
    paddingBottom: 150
  },
  backgroundContainer: { backgroundColor: '#ffb380', flex: 1 },
  buttonFilter: {
    padding: 4
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(Home);
