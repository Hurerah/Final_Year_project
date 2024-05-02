import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import LoginScreen from '../Screen/login';
import RegisterScreen from '../Screen/SignUp';

const Profile = ({navigation}) => {
  // Placeholder data - replace with real user data
  const userName = 'Hurerah';
  const userEmail = 'Abuhurerah.saleem@gmail.com';

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={require("../assets/user.jpg")} 
          style={styles.profilePic} 
        />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.profileActions}>
        <TouchableOpacity style={styles.actionButton} 
         onPress=
              {
                  ()=>navigation.navigate('Login' )
              } >
          <Text>Login </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} 
        onPress=
              {
                  ()=>navigation.navigate('Sign up')
              } >
          <Text>Sign up </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}
         onPress=
         {
             ()=>navigation.navigate('Setting' )
         } >
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}
         onPress=
         {
             ()=>navigation.navigate('Login' )
         } >
        
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>

  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 18,
    color: 'gray',
  },
  profileActions: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
});
