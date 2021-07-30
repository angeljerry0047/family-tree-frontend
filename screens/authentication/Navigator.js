import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp';
import Verify from './Verify';

const AuthNavigatorStack = createStackNavigator();
const AuthNavigatorScreen = function () {
  return (
    <NavigationContainer>
      <AuthNavigatorStack.Navigator>
        <AuthNavigatorStack.Screen name="SignUp" component={SignUp} />
        <AuthNavigatorStack.Screen name="Verify" component={Verify} />
      </AuthNavigatorStack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigatorScreen;
