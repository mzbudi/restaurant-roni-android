import React, { Component } from 'react';
import { Form, Item, Input, Label } from 'native-base';

class ProfileField extends Component {
  render() {
    const { userData } = this.props;
    return (
      <Form>
        <Item fixedLabel>
          <Label>Name</Label>
          <Input value={userData.name} disabled />
        </Item>
        <Item fixedLabel>
          <Label>Username</Label>
          <Input value={userData.username} disabled />
        </Item>
        <Item fixedLabel last>
          <Label>Join Date</Label>
          <Input value={userData.created_at} disabled />
        </Item>
      </Form>
    );
  }
}

export default ProfileField;
