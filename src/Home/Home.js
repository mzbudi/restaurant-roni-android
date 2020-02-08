import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList, Image } from 'react-native';
import { Content, Icon } from 'native-base';

const dataProducts = new Array(100).fill({
  id: 1,
  name: 'Kopi',
  price: '5000',
  image:
    'https://doktersehat.com/wp-content/uploads/2018/11/kopi-doktersehat.jpg'
});

export default class Home extends Component {
  render() {
    return (
      <View>
        <View style={styles.navBar}>
          <Text>Roni</Text>
          <Text>Roni</Text>
          <Text>Roni</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  card: {
    backgroundColor: 'white',
    elevation: 15,
    margin: 16,
    padding: 16,
    marginBottom: 0,
    flexDirection: 'row'
  },
  image: {
    height: 50,
    width: 50
  },
  navBar: {
    backgroundColor: '#669999',
    width: '100%',
    flexDirection: 'row'
  },
  text: {
    margin: 16,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  container: {
    padding: 16,
    backgroundColor: '#ffb380',
    flex: 1
  }
};

{
  /* <FlatList
          data={dataProducts}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            //disini letak fungsi sederhanaaaa
            return (
              <View style={styles.card}>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      'https://doktersehat.com/wp-content/uploads/2018/11/kopi-doktersehat.jpg'
                  }}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text>{item.name}</Text>
                  <Text>{item.price}</Text>
                </View>
              </View>
            );
          }}
        /> */
}
