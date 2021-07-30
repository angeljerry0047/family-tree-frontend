import React, { Component } from 'react';
import { Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right } from 'native-base';
import i18n from '../../services/i18nService';
export default class CardImage extends Component {
  render() {
      const cardItem = this.props.users.length > 0 ? 
        this.props.users.map(user => {
          return (
            <CardItem button onPress={() => this.props.onSelect(user)} key={user.id}>
                <Left>
                <Thumbnail source={{uri: (user.imageUrl || 'https://raw.githubusercontent.com/Infernus101/ProfileUI/0690f5e61a9f7af02c30342d4d6414a630de47fc/icon.png')}} />
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
      }) : (
        <Text style={i18n.isRtl ? { textAlign: 'right' } : {}}>
          { i18n.t('noSearchResults') }
        </Text>
      )

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