import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/home';
import Pophandler from '../component/pophandler';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Disease Details" component={Pophandler} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
