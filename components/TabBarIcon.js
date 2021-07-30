import React from 'react';
import * as Icon from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        color={this.props.focused ? this.props.color : Colors.tabIconDefault}
      />
    );
  }
}