import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { API_HOST } from 'react-native-dotenv';
import { formatRupiah } from '../Public/helper/parseRupiah';

class CardProduct extends Component {
  render() {
    const { product_name, product_price, product_image } = this.props;
    const product_image_fixed =
      `${API_HOST}` + product_image.replace('assets', '');
    return (
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: product_image_fixed
          }}
        />
        <View style={styles.bottomCardText}>
          <Text style={styles.textName}>{product_name}</Text>
          <Text style={styles.textPrice}>
            {formatRupiah(product_price, 'Rp. ')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  card: {
    backgroundColor: 'white',
    elevation: 15,
    margin: 8,
    borderRadius: 8,
    marginBottom: 8,
    width: 150
  },
  image: {
    height: 120,
    width: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  bottomCardText: { marginLeft: 8 },
  textName: { fontSize: 16, padding: 4, fontWeight: 'bold' },
  textPrice: { fontSize: 14, padding: 4, fontWeight: 'bold' }
};

export default CardProduct;
