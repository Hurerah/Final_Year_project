import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); // Ignore all log notifications
import { StatusBar, StyleSheet, Text, ImageBackground, Header, TouchableOpacity, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Splash Screen
import SplashScreen from './component/SplashScreen';
//OnBoarding
import OnBoardingScreenOne from './component/OnBoardingScreen/OnBoardScreenOne';
import OnBoardingScreenTwo from './component/OnBoardingScreen/OnBoardScreenTwo';
import OnBoardingScreenThree from './component/OnBoardingScreen/OnBoardScreenThree';
// Screens
import ProfileScreen from './Screen/profile';
import HomeScreen from './Screen/home';
import NotificationsScreen from './Screen/notifications';
import SettingsScreen from './Screen/settings';
import ContactUsScreen from './Screen/ContactUsScreen';
import FAQScreen from './Screen/Faq';
import TermsAndConditionsScreen from './Screen/terms&Conditions';
import LoginScreen from './Screen/login'
import RegisterScreen from "./Screen/SignUp";
import Pophandler from './component/pophandler';
import CustomHeader from './component/header';
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const updateStack = createStackNavigator();
const profileStack = createStackNavigator();
const startStack = createStackNavigator();
// const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

// useEffect(() => {
//   const checkLoginStatus = async () => {
//     const token = await AsyncStorage.getItem('userToken');
//     setIsUserLoggedIn(true);
//   };

//   checkLoginStatus();
// }, []);


// Define Home stack navigator
const HomeStackScreen = () => (

  <HomeStack.Navigator  >
    <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <HomeStack.Screen name="Disease Details" component={Pophandler} options={{ headerShown: false }} />

  </HomeStack.Navigator>
);
const UpdateStackScreen = () => (
  <updateStack.Navigator  >
    <updateStack.Screen name="Setting" component={SettingsScreen} options={{ headerShown: false }} />
    <updateStack.Screen name="Contact us" component={ContactUsScreen} options={{ headerShown: false }} />
    <updateStack.Screen name="FAQ" component={FAQScreen} options={{ headerShown: false }} />
    <updateStack.Screen name="Terms and Conditions" component={TermsAndConditionsScreen} options={{ headerShown: false }} />
  </updateStack.Navigator>
);
const ProfileStackScreen = () => (
  <profileStack.Navigator  >
    {/* {isUserLoggedIn ? (
          <> */}
    <profileStack.Screen name="One" component={OnBoardingScreenOne} options={{ headerShown: false }} />
    <profileStack.Screen name="Two" component={OnBoardingScreenTwo} options={{ headerShown: false }} />
    <profileStack.Screen name="Three" component={OnBoardingScreenThree} options={{ headerShown: false }} />
    <profileStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <profileStack.Screen name="Sign up" component={RegisterScreen} options={{ headerShown: false }} />
    {/* </>):(<> */}
    <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <profileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <updateStack.Screen name="Setting" component={SettingsScreen} options={{ headerShown: false }} />
    {/* </>)} */}
  </profileStack.Navigator>
);
// const startStackScreen = () => (
//   <startStack.Navigator  >
//     <startStack.Screen name="One" component={ OnBoardingScreenOne} options={{ headerShown: false }} /> 
//      <startStack.Screen name="Two" component={ OnBoardingScreenTwo} options={{ headerShown: false }} />
//      <startStack.Screen name="Three" component={ OnBoardingScreenThree} options={{ headerShown: false }} />

//     <startStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> 
//      <startStack.Screen name="Sign up" component={RegisterScreen} options={{ headerShown: false }} />

//     </profileStack.Navigator>
// );
const Stack = createNativeStackNavigator();




const screenOptions = {
  tabBarShowLabel: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff', // Corrected property name
  },
  headerStyle: {
    height: 90,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 25,
    backgroundColor: '#023020',
    shadowColor: '#000',
  },
};
export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="OnBoardingScreenOne"
            component={OnBoardingScreenOne}
          />
          <Stack.Screen
            name="OnBoardingScreenTwo"
            component={OnBoardingScreenTwo}
          />
          <Stack.Screen
            name="OnBoardingScreenThree"
            component={OnBoardingScreenThree}
          />
        </Stack.Group>
      </Stack.Navigator>
       */}
      <StatusBar style="auto" />
      <Tab.Navigator initialRouteName="HomeStackScreen" screenOptions={screenOptions}>
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="person" size={24} color={focused ? "#023020	" : "#111"} />
                <Text style={{ fontSize: 12, color: "#023020" }}>Profile</Text>
              </View>
            ),
            headerTitle: () => <CustomHeader title="Profile" />,
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Ionicons name="person" size={26} color='white' />
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen
          name="Updates"
          // component={Leaftype} // Use the component directly
          // initialParams={{ // Pass parameters using initialParams
          //   leafType: "Corn",
          //   disease: "Canker", 
          //   causes: 'Leaf diseases in apple trees can be caused by various factors, including fungal pathogens, bacterial infections, environmental stressors, and poor orchard management practices. Fungal diseases often thrive in humid conditions, while bacterial infections can spread through contaminated equipment or insect vectors',
          //   remedies:'Leaf diseases in apple trees can be caused by various factors, including fungal pathogens, bacterial infections, environmental stressors, and poor orchard management practices. Fungal diseases often thrive in humid conditions, while bacterial infections can spread through contaminated equipment or insect vectors'
          // }}
          component={UpdateStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="list" size={24} color={focused ? "#023020" : "#111"} />
                <Text style={{ fontSize: 12, color: "#023020" }}>Updates</Text>
              </View>
            ),
            headerShown: false,
            headerTitle: () => <CustomHeader title="Updates" />,
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Entypo name="list" size={28} color='white' />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#023020",
                width: Platform.OS === "ios" ? 70 : 60,
                height: Platform.OS === "ios" ? 70 : 60,
                top: Platform.OS === "ios" ? -6 : -20,
                borderRadius: Platform.OS === "ios" ? 35 : 30,
                borderWidth: 2,
                borderColor: "#ffffff"
              }}>
                <Entypo name="leaf" size={24} color="#fff" />
              </View>
            ),
            headerTitle: () => <CustomHeader title="Home" />,
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Entypo name="leaf" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={UpdateStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="settings" size={24} color={focused ? "#023020" : "#111"} />
                <Text style={{ fontSize: 12, color: "#023020" }}>Setting</Text>
              </View>
            ),
            headerTitle: () => <CustomHeader title="Settings" />,
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons name='cog-outline' size={28} color='white' />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Support"
          component={ContactUsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="paper-plane" size={24} color={focused ? "#023020" : "#111"} />
                <Text style={{ fontSize: 12, color: "#023020" }}>Support</Text>
              </View>
            ),
            headerTitle: () => <CustomHeader title="Support" />,
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Entypo name="paper-plane" size={28} color='white' />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
    zIndex: 10,
  },

  roundedImage: {
    borderBottomLeftRadius: 20, // Adjust the radius to suit your design
    borderBottomRightRadius: 20, // Adjust the radius to suit your design
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%', // Adjust as needed
    height: 200, // Adjust as needed

  },
  text: {

    fontSize: 24,
    position: 'absolute',
  },
  headerContainer: {
    backgroundColor: '#386641', // Adjust the color to match your design
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10, // Padding for status bar height
    paddingBottom: 10, // Reduced padding for a shorter header
  },
  logo: {
    width: 170, // Reduced width for a smaller logo
    height: 40, // Reduced height for a smaller logo
  },
  tabBar: {
    height: 60,
    borderTopWidth: 0,
    backgroundColor: '#F9F6EE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },
  tabBarItem: {
    borderRadius: 30, // Fully rounded corners for circular icons
    margin: 5, // Add some margin around icons
  },
  // Add styles for buttons
  button: {
    backgroundColor: '#386641', // Use the main color for buttons
    borderRadius: 20, // Rounded corners for buttons
    padding: 15,
    alignItems: 'center',
    marginVertical: 10, // Add vertical margin for separation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#F9F6EE', // Contrast color for text inside button
    fontWeight: 'bold',
  }
});

