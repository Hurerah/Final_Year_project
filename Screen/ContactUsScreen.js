import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
const sendEmail = async (email) => {
  const url = `mailto:${email}`;
  // Check if linking can be handled
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    Linking.openURL(url);
  } else {
    console.log('Cannot handle URL: ' + url);
  }
};
const makeCall = async (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  // Check if linking can be handled
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    Linking.openURL(url);
  } else {
    console.log('Cannot handle URL: ' + url);
  }
};



const ContactUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/logo.png')} // Add an appropriate image
          style={styles.image}
        />
        <Text style={styles.introText}>We're here to help and answer any questions you might have. We look forward to hearing from you!</Text>
        <View style={styles.contactMethod}>
          <Text style={styles.methodHeader}>Report Anomaly</Text>
          <TouchableOpacity onPress={() => sendEmail('anomaly@leafCare.com')}>
            <Text style={styles.text}>anomaly@leafCare.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactMethod}>
          <Text style={styles.methodHeader}>Technical Issue</Text>
          <TouchableOpacity onPress={() => sendEmail('service@leafcare.com')}>
            <Text style={styles.text}>service@leafcare.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactMethod}>
          <Text style={styles.methodHeader}>Request New Feature</Text>
          <TouchableOpacity onPress={() => sendEmail('request@leafcare.com')}>
            <Text style={styles.text}>request@leafcare.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactMethod}>
          <Text style={styles.methodHeader}>Other</Text>
          <TouchableOpacity onPress={() => sendEmail('info@leafcare.com')}>
            <Text style={styles.text}>info@leafcare.com</Text>
          </TouchableOpacity>        
        </View>
        <View style={styles.contactMethod}>
          <Text style={styles.methodHeader}>Call Us</Text>
          <TouchableOpacity onPress={() => makeCall('+92-348-2685910')}>
            <Text style={styles.text}>Call: +92-348-2685910</Text>
          </TouchableOpacity>      
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Soft background color
  },
  content: {
    padding: 20,
    alignItems: 'center', // Center the content
    marginBottom: 40
    
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#023020', // Theme color for header
    marginBottom: 20,
  },
  introText: {
    fontSize: 16,
    color: '#555', // Darker text for readability
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Circular image
    marginBottom: 20,
  },
  contactMethod: {
    width: '100%', // Full width for alignment
    padding: 10,
    backgroundColor: '#fff', // White background for each section
    marginBottom: 15,
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  methodHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023020',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});

export default ContactUsScreen;
