import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.lastUpdated}>Last updated: [12-03-2023]</Text>

      <Text style={styles.sectionTitle}>1. Use of the App</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.subHeader}>License: </Text>
        Leaf Care grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the app solely for your personal, non-commercial purposes strictly in accordance with the terms of this agreement.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.subHeader}>Restrictions: </Text>
        You agree not to, and you will not permit others to license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose, or otherwise commercially exploit the app or make the app available to any third party.
      </Text>

      <Text style={styles.sectionTitle}>2. User Content</Text>
      <Text style={styles.paragraph}>
        Users may share personal data, photographs of plants, or other content through the app. You grant Leaf Care a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, publish, and display such content for the purpose of providing and improving the app.
      </Text>

      <Text style={styles.sectionTitle}>3. Intellectual Property Rights</Text>
      <Text style={styles.paragraph}>
      The app and all contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Leaf Care, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws
      </Text>

      <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
      <Text style={styles.paragraph}>
      Your use of the app is also subject to our Privacy Policy, which informs users about our data collection practices. Please review our Privacy Policy, which also governs your visit to our app, to understand our practices.      </Text>
      <Text style={styles.sectionTitle}>5. Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions about these Terms, please contact us at support@leafcaredetection.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0', // Light grey background for contrast
    marginBottom: 75,
  },
  lastUpdated: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023020',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    lineHeight: 24, // Increases line height for readability
  },
  subHeader: {
    fontWeight: 'bold',
  },
});

export default TermsAndConditionsScreen;
