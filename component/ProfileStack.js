import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screen/profile';
import LoginScreen from '../Screen/login';
import RegisterScreen from '../Screen/SignUp';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Sign up" component={RegisterScreen} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
