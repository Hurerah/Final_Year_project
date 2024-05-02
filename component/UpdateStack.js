import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../Screen/settings';
import ContactUsScreen from '../Screen/ContactUsScreen';
import FAQScreen from '../Screen/Faq';
import TermsAndConditionsScreen from '../Screen/terms&Conditions';

const UpdateStack = createStackNavigator();

const UpdateStackScreen = () => {
  return (
    <UpdateStack.Navigator>
      <UpdateStack.Screen name="Setting" component={SettingsScreen} options={{ headerShown: false }} />
      <UpdateStack.Screen name="Contact us" component={ContactUsScreen} options={{ headerShown: false }} />
      <UpdateStack.Screen name="FAQ" component={FAQScreen} options={{ headerShown: false }} />
      <UpdateStack.Screen name="Terms and Conditions" component={TermsAndConditionsScreen} options={{ headerShown: false }} />
    </UpdateStack.Navigator>
  );
};

export default UpdateStackScreen;
