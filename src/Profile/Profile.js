import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import NavbarSidebar from '../Components/NavbarSidebar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'roni'
    };
  }
  static navigationOptions = {
    header: null,
    headerShown: false
  };
  render() {
    return (
      <Container style={styles.backgroundContainer}>
        <View style={styles.profilePic}>
          <Text style={styles.profileText}>Profile</Text>
          <Image
            style={styles.imageProfile}
            source={{
              uri:
                'https://doktersehat.com/wp-content/uploads/2018/11/kopi-doktersehat.jpg'
            }}
          />
        </View>
        <View style={styles.formProfile}>
          <Form>
            <Item fixedLabel>
              <Label>Name</Label>
              <Input value={this.state.username} disabled />
            </Item>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input value={this.state.username} disabled />
            </Item>
            <Item fixedLabel last>
              <Label>Join Date</Label>
              <Input value={this.state.username} disabled />
            </Item>
          </Form>
          {/* <Text style={{ alignSelf: 'center' }}>
            Name : {this.state.username}
          </Text>
          <Text>Name : {this.state.username} </Text>
          <Text>Name : {this.state.username} </Text> */}
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
    );
  }
}

export default Profile;

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
