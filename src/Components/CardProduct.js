import React, { Component } from 'react';
import { Image, Text, Dimensions, View } from 'react-native';
import { API_HOST } from 'react-native-dotenv';
import { formatRupiah } from '../Public/helper/parseRupiah';
import { Card, CardItem } from 'native-base';

class CardProduct extends Component {
  render() {
    const { product_name, product_price, product_image } = this.props;
    const product_image_fixed =
      `${API_HOST}` + product_image.replace('assets', '');
    return (
      <Card style={styles.card}>
        <CardItem cardBody>
          <Image
            style={styles.image}
            source={{
              uri: product_image_fixed
            }}
          />
        </CardItem>
        <CardItem bordered>
          <View>
            <Text style={styles.textName}>{product_name}</Text>
            <Text>{formatRupiah(product_price, 'Rp. ')}</Text>
          </View>
        </CardItem>
      </Card>
    );
  }
}

const styles = {
  card: {
    flex: 1,
    width: Dimensions.get('window').width / 2.2,
    margin: 8,
    borderRadius: 40
  },
  image: { width: '100%', height: 100 },
  textName: { fontWeight: 'bold' },
  textPrice: { fontWeight: 'bold' }
};

export default CardProduct;
