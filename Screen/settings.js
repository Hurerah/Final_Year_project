import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SettingsOption = ({ icon, title, onPress, iconImg }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress}>
    <View style={styles.iconContainer}>
      {iconImg ? (
        <Image source={iconImg} style={styles.iconImage} />
      ) : (
        <MaterialIcons name={icon} size={24} color="#386641" />
      )}
    </View>
    <Text style={styles.optionTextCard}>{title}</Text>
    <MaterialIcons name="chevron-right" size={24} color="#C0C0C0" />
  </TouchableOpacity>
);

const Settings = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/setting.jpg')}
      style={styles.background}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer} // Apply layout styles here
      >
        <SettingsOption iconImg={require('../assets/darkmode.png')} title="Dark Mode" onPress=
              {
                  ()=>navigation.navigate('Contact us')
              } />
        <SettingsOption iconImg={require('../assets/terms.png')} title="Terms and Conditions" onPress=
              {
                ()=>navigation.navigate('Terms and Conditions')
              } />
        <SettingsOption iconImg={require('../assets/FAQ.png')} title="FAQ" onPress=
        {
          ()=>navigation.navigate('FAQ' )
      } />
      
        <SettingsOption iconImg={require('../assets/contact.png')} title="Contact Us" onPress=
        {
          ()=>navigation.navigate('Contact us' )
      } />
      </ScrollView>
    </ImageBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: '#FFFFFF',
    width: 150, // Set a fixed width for square shape
    height: 150, // Equal height to width to create a square
    justifyContent: 'center',
    alignItems: 'center', // Center the content horizontally
    margin: 10, // Adds spacing between cards
    borderRadius: 10, // Optional: rounded corners for the card
    elevation: 5, // Adds shadow for elevation effect
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    marginBottom: 10, // Space between icon and text
  },
  optionTextCard: {
    fontSize: 16,
    fontWeight: '500',
    color: '#386641',
    textAlign: 'center', // Center text
    paddingHorizontal: 5, // Ensure text does not touch the sides
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row', // Adjusts direction of children
    flexWrap: 'wrap', // Allows children to wrap to next line
    justifyContent: 'space-around', // Distributes space evenly around the children
    padding: 10, // Padding inside the ScrollView, around the content
  },
  iconImage: {
    width: 60, // Set your desired width
    height: 60, // Set your desired height
    resizeMode: 'contain', // Ensures the image scales correctly within the bounds
  },
});
