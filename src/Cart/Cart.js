import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Drawer
} from 'native-base';
import NavbarCart from '../Components/NavbarCart';
import SideBarCart from '../Components/SideBarCart';
// import { requestProducts } from './action';
import { connect } from 'react-redux';

class Cart extends Component {
  static navigationOptions = {
    header: null,
    headerShown: false
  };

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }
  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBarCart {...this.props} navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container style={styles.backgroundContainer}>
          <NavbarCart draw={this.openDrawer.bind(this)} />
          <View style={styles.formProfile}>
            <Form>
              <Item fixedLabel>
                <Label>Name</Label>
                <Input disabled />
              </Item>
              <Item fixedLabel>
                <Label>Username</Label>
                <Input disabled />
              </Item>
              <Item fixedLabel last>
                <Label>Join Date</Label>
                <Input disabled />
              </Item>
            </Form>
          </View>
          <TouchableOpacity style={styles.buttonChangeProfile}>
            <View>
              <Text style={styles.text}>Change Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonChangeProfile}>
            <View>
              <Text style={styles.text}>Change Password</Text>
            </View>
          </TouchableOpacity>
        </Container>
      </Drawer>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products
  };
};

export default Cart;
// export default connect(mapStateToProps)(Cart);

const styles = {
  buttonChangeProfile: {
    margin: 16,
    marginBottom: 0,
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
  }
};
