import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class CardImage extends Component {
  render() {
      const cardItem = this.props.users.length > 0 ? 
        this.props.users.map(user => {
          return (
            <CardItem>
                <Left>
                <Thumbnail source={{uri: user.imageUrl}} />
                <Body>
                    <Text>{user.name}</Text>
                    <Text note>{user.nickName}</Text>
                </Body>
                </Left>
                <Right>
                <Icon name='arrow-up' />
                </Right>
            </CardItem>
          )
      }) : <Text>Daddy is empty, please feed him!</Text>



    return (
        <Content>
          <Card transparent>
            {cardItem}
          </Card>
        </Content>
    );
  }
}
const styles = {
    button: {
        backgroundColor: '#d2f3e7',
    },
    textContent: {
        color: '#20c67d'
    }
};