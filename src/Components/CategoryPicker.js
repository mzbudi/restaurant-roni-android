import React, { Component } from 'react';
import { Content, Form, Item, Picker } from 'native-base';

export default class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  handleFilter = id => {
    this.props.categoryPick(id);
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
              style={{ ...{ width: 200 } }}
              placeholder="Select your SIM"
              placeholderStyle={{ ...{ color: '#bfc6ea' } }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected}
              onValueChange={value => {
                this.onValueChange(value);
              }}>
              <Picker.Item label="All" value="" key="all" />
              {category.dataCategory.map((item, index) => {
                return (
                  <Picker.Item
                    key={index}
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
