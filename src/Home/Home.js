import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import NavbarNavigation from '../Components/NavbarNavigation';
import CardProduct from '../Components/CardProduct';
import {
  requestProducts,
  emptyProducts
} from '../Public/redux/action/products';
import { requestCategory } from '../Public/redux/action/category';
import { connect } from 'react-redux';
import SideBar from '../Components/SideBar';
import { Drawer, Button, Text } from 'native-base';
import CategoryPicker from '../Components/CategoryPicker';
import { addCart } from '../Public/redux/action/cart';
import { getProfile } from '../Public/redux/action/users';

const defaultState = {
  nameSearch: '',
  category_id: '',
  limit: '8',
  page: 0,
  product_name: '',
  date: ''
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProducts: [],
      ...defaultState,
      refresh: false,
      lengthData: 0
    };
  }

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer = () => {
    this._drawer._root.open();
  };

  static navigationOptions = {
    headerShown: false
  };

  componentDidMount() {
    const { auth } = this.props;
    const headers = { authorization: `Bearer ${auth.data.token}` };
    const user_id = auth.data.user_id;
    const configCategory = {
      headers
    };
    const config = {
      headers,
      params: {
        ...defaultState,
        nameSearch: ''
      }
    };
    this.props.dispatch(getProfile(user_id, configCategory));
    this.props.dispatch(emptyProducts());
    this.props.dispatch(requestProducts(config));
    this.props.dispatch(requestCategory(configCategory));
  }

  handleSearchByName = text => {
    this.setState(
      {
        ...defaultState,
        nameSearch: text
      },
      () => {
        const { auth } = this.props;
        const headers = { authorization: `Bearer ${auth.data.token}` };
        const config = {
          headers,
          params: {
            ...defaultState,
            nameSearch: text
          }
        };
        this.props.dispatch(emptyProducts());
        this.props.dispatch(requestProducts(config));
      }
    );
  };

  handleCategory = id => {
    // const { dispatch } = this.props;
    this.setState(
      {
        ...defaultState
      },
      () => {
        const { auth } = this.props;
        const headers = { authorization: `Bearer ${auth.data.token}` };
        const config = {
          headers,
          params: {
            ...defaultState,
            category_id: id
          }
        };
        this.props.dispatch(emptyProducts());
        this.props.dispatch(requestProducts(config));
      }
    );
  };

  handleNextPage = () => {
    const { nameSearch, category_id, page, product_name, date } = this.state;
    this.setState(
      {
        page: page + 1
      },
      () => {
        const { auth } = this.props;
        const headers = { authorization: `Bearer ${auth.data.token}` };
        const config = {
          headers,
          params: {
            ...defaultState,
            nameSearch: nameSearch,
            category_id: category_id,
            page: this.state.page,
            product_name: product_name,
            date: date
          }
        };
        this.props.dispatch(requestProducts(config)).then(({ value }) => {
          this.setState({
            lengthData: value.data.data.searchResult.length
          });
        });
      }
    );
  };

  handleSort = sorter => {
    const { auth } = this.props;
    const headers = { authorization: `Bearer ${auth.data.token}` };

    if (sorter === 'product_name') {
      this.setState(
        {
          ...defaultState,
          product_name: sorter
        },
        () => {
          const config = {
            headers,
            params: {
              ...defaultState,
              product_name: sorter
            }
          };
          this.sortData(config);
        }
      );
    } else {
      this.setState(
        {
          ...defaultState,
          date: sorter
        },
        () => {
          const config = {
            headers,
            params: {
              ...defaultState,
              date: sorter
            }
          };
          this.sortData(config);
        }
      );
    }
  };

  sortData = config => {
    this.props.dispatch(emptyProducts());
    this.props.dispatch(requestProducts(config));
  };

  addToCart = item => {
    this.props.dispatch(addCart(item));
  };

  render() {
    const { products } = this.props;
    // const { lengthData } = this.state;
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBar {...this.props} navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <View style={styles.backgroundContainer}>
          <NavbarNavigation
            {...this.props}
            draw={this.openDrawer}
            input={this.handleSearchByName.bind(this)}
          />
          <Text style={styles.headerTittle}>
            Wellcome, Please Choose What You Want !
          </Text>
          <View style={styles.buttonHeader}>
            <ScrollView horizontal={true}>
              <Button
                rounded
                style={styles.buttonFilter}
                onPress={() => this.handleSort('product_name')}>
                <Text style={styles.fontBolder}>Name</Text>
              </Button>
              <Button
                rounded
                style={styles.buttonFilter}
                onPress={() => this.handleSort('updated_by')}>
                <Text style={styles.fontBolder}>Newest</Text>
              </Button>
              <CategoryPicker
                {...this.props}
                categoryPick={this.handleCategory.bind(this)}
              />
            </ScrollView>
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
                    key={index}
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
              onEndReached={this.handleNextPage}
              onEndReachedThreshold={0.01}
              ListFooterComponent={
                products.isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color="grey"
                    style={styles.actIndicator}
                  />
                ) : null
              }
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
    padding: 16,
    marginBottom: 16
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
    padding: 4,
    backgroundColor: '#ff8000'
  },
  fontBolder: {
    fontWeight: 'bold'
  },
  buttonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: 16
  },
  headerTittle: { alignSelf: 'center', padding: 8, fontWeight: 'bold' },
  actIndicator: {
    marginBottom: 20
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category,
    cart: state.cart,
    users: state.users
  };
};

export default connect(mapStateToProps)(Home);
