import React from 'react';
import { SafeAreaView } from 'react-native';
import { Container, Content } from 'native-base';
import styles from './styles';

class AuthContainer extends React.Component {
  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {navigation: this.props.navigation});
    });
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Container style={styles.container}>
          <Content contentContainerStyle={styles.content}>
            { children }
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default AuthContainer;