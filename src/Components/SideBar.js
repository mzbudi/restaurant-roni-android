import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Right,
  Text,
  List,
  ListItem,
  Left,
  Icon
} from 'native-base';
import { requestLogout } from '../Auth/action';
import NavbarSidebar from '../Components/NavbarSidebar';

class Sidebar extends Component {
  handleLink = link => {
    this.props.navigation.navigate(link);
  };

  handleLogout = () => {
    this.props.dispatch(requestLogout());
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Container style={styles.backgroundContainer}>
        <NavbarSidebar {...this.props} />
        <Content padder>
          <List>
            <ListItem
              noIndent
              button
              onPress={() => {
                this.handleLink('Profile');
              }}>
              <Left>
                <Text>Profile</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              noIndent
              button
              onPress={() => {
                this.handleLink('History');
              }}>
              <Left>
                <Text>History</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              noIndent
              button
              onPress={() => {
                this.handleLink('Cart');
              }}>
              <Left>
                <Text>Cart</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              style={styles.buttonLogout}
              onPress={() => {
                this.handleLogout();
              }}>
              <Text style={{ fontSize: 14 }}>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Sidebar;

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
    height: 50,
    width: 50,
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
  backgroundContainer: { backgroundColor: '#ffb380' },
  buttonLogout: {
    backgroundColor: '#ff5c33'
  }
};
