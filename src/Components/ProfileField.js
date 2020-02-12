import React, { Component } from 'react';
import { Form, Item, Input, Label } from 'native-base';
import Moment from 'moment';

class ProfileField extends Component {
  render() {
    const { userData, name } = this.props;
    return (
      <Form>
        <Item fixedLabel>
          <Label>Name</Label>
          <Input value={name} disabled />
        </Item>
        <Item fixedLabel>
          <Label>Username</Label>
          <Input value={userData.username} disabled />
        </Item>
        <Item fixedLabel last>
          <Label>Join Date</Label>
          <Input
            value={String(Moment(userData.created_at).format('MMMM Do YYYY'))}
            disabled
          />
        </Item>
      </Form>
    );
  }
}

export default ProfileField;
