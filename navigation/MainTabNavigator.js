import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import SearchScreen from '../screens/SearchScreen';
import IndividualScreen from '../screens/IndividualScreen';
import IndividualSearch from '../screens/IndividualSearch';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';



const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return <SearchStack.Navigator
    screenOptions={({ route }) => {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name='md-search'
        />
      )
    }}
  >
    <SearchStack.Screen name="Search" component={SearchScreen}></SearchStack.Screen>
  </SearchStack.Navigator>
}

const TreeStack = createStackNavigator();
function TreeStackScreen() {
  return <TreeStack.Navigator>
    <TreeStack.Screen name="IndividualScreen" component={IndividualScreen} options={IndividualScreen.navigationOptions}></TreeStack.Screen>
    <TreeStack.Screen name="EditIndividual" component={EditProfileScreen} options={EditProfileScreen.navigationOptions}></TreeStack.Screen>
    <TreeStack.Screen name="IndividualSearch" component={IndividualSearch}></TreeStack.Screen>
  </TreeStack.Navigator>
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} options={ProfileScreen.navigationOptions}></ProfileStack.Screen>
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen}></ProfileStack.Screen>
  </ProfileStack.Navigator>
}

// const TreeStack = createStackNavigator({
//   IndividualScreen: IndividualScreen,
//   EditIndividual: EditProfileScreen,
//   IndividualSearch: IndividualSearch
// });

// TreeStack.navigationOptions = {
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name='md-leaf'
//     />
//   ),
// };

// const ProfileStack = createStackNavigator({
//   Profile: ProfileScreen,
//   EditProfile: EditProfileScreen,
// });

// ProfileStack.navigationOptions = {
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name='md-person'
//     />
//   ),
// };

// export default createBottomTabNavigator({
//   TreeStack,
//   ProfileStack,
//   SearchStack
// },
//   {
//     tabBarOptions: {
//       activeBackgroundColor: colors.secondaryThemeColor,
//       showLabel: false,
//       tabStyle: {
//         borderRadius: '20px'
//       },
//       style: {
//         backgroundColor: colors.themeColor
//       }
//     }
//   });

const Tab = createBottomTabNavigator();

export default () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Search" component={SearchStackScreen} options={{
            tabBarLabel: 'Search Me',
            tabBarIcon: ({ focused, color, size }) => {
              return <TabBarIcon
                focused={focused}
                name='md-search'
                color={color}
                size={size}
              />
            }
          }} />
          <Tab.Screen name="Details" component={TreeStackScreen} options={{
            tabBarLabel: 'Details',
            tabBarIcon: ({ focused, color, size }) => {
              return <TabBarIcon
                focused={focused}
                name='md-leaf'
                color={color}
                size={size}
              />
            }
          }} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
            tabBarLabel: 'My Profile',
            tabBarIcon: ({ focused, color, size }) => {
              return <TabBarIcon
                focused={focused}
                name='md-person'
                color={color}
                size={size}
              />
            }
          }} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};