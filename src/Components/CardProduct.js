import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

class CardProduct extends Component {
  formatRupiah = (angka, prefix) => {
    let number_string = angka.toString().replace(/[^,\d]/g, '');
    let split = number_string.split(',');
    let remains = split[0].length % 3;
    let rupiah = split[0].substr(0, remains);
    let thausand = split[0].substr(remains).match(/\d{3}/gi);

    if (thausand) {
      let separator = remains ? '.' : '';
      rupiah += separator + thausand.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  };
  render() {
    const { product_name, product_price, product_image } = this.props;
    const product_image_fixed =
      'http://localhost:3001/' + product_image.replace('assets', '');
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
          <Text>{this.formatRupiah(product_price)}</Text>
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
  textName: { fontSize: 16 }
};

export default CardProduct;
