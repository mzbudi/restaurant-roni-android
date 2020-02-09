import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import NavbarNavigation from '../Components/NavbarNavigation';
import CardProduct from '../Components/CardProduct';
import { requestProducts } from './action';
import { connect } from 'react-redux';
import SideBar from '../Components/SideBar';
import { Input, Item, Drawer, Button, Text } from 'native-base';

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
    const headers = { authorization: this.props.auth.data.token };
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
  }

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
          <NavbarNavigation draw={this.openDrawer.bind(this)} />
          <Text>Wellcome, Please Choose What You Want !</Text>
          <View style={styles.container}>
            <FlatList
              data={products.dataProducts}
              numColumns={3}
              keyExtractor={item => item.product_id}
              contentContainerStyle={styles.containerView}
              renderItem={({ item, index }) => {
                //disini letak fungsi sederhanaaaa
                return (
                  <CardProduct
                    product_image={item.product_image}
                    product_name={item.product_name}
                    product_price={item.product_price}
                  />
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
    paddingBottom: 80
  },
  backgroundContainer: { backgroundColor: '#ffb380', flex: 1 }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products
  };
};

export default connect(mapStateToProps)(Home);
