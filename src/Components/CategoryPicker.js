import React, { Component } from 'react';
import { Content, Form, Item, Picker } from 'native-base';
import { requestProducts } from '../Home/action';

export default class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  handleFilter = id => {
    const { auth } = this.props;
    const headers = { authorization: auth.data.token };
    let config = '';
    if (id === 'All') {
      config = {
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
    } else {
      config = {
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
    }

    this.props.dispatch(requestProducts(config));
  };

  onValueChange(value) {
    this.setState(
      {
        selected: value
      },
      () => {
        this.handleFilter(this.state.selected);
      }
    );
  }
  render() {
    const { category } = this.props;
    return (
      <Content>
        <Form>
          <Item picker>
            <Picker
              mode="dropdown"
              style={{ width: 200 }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected}
              onValueChange={value => {
                this.onValueChange(value);
              }}>
              <Picker.Item label="All" value="All" />
              {category.dataCategory.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.category_name}
                    value={item.category_id}
                  />
                );
              })}
            </Picker>
          </Item>
        </Form>
      </Content>
    );
  }
}
