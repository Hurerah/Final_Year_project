import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible'; // Assuming you're using react-native-collapsible

const FAQ = ({ question, answer }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <Text style={styles.question}>{question}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <Text style={styles.answer}>{answer}</Text>
      </Collapsible>
    </View>
  );
};

const FAQScreen = () => {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Frequently Asked Questions</Text>
        <FAQ
          question="How do I use the app to detect plant diseases?"
          answer="To detect plant diseases, simply capture a photo of the plant's leaf within the app. The app will analyze the image and provide you with the disease diagnosis, remedies, and recommended pesticides if pests are detected."
        />
        <FAQ
          question="What types of plant diseases can the app detect?"
          answer="Our app is capable of identifying a wide range of plant diseases, including Apple, Tomato, Citrus, Cor, Lemon."
        />
        <FAQ
  question="Is an internet connection required to use the app?"
  answer="Yes, an active internet connection is required for the app to analyze the images and provide accurate disease diagnoses, as the analysis is powered by our cloud-based AI model."
/>
<FAQ
  question="How accurate is the disease detection feature?"
  answer="Our disease detection feature is highly accurate, having been trained on a vast dataset of plant images. However, accuracy can vary slightly depending on the quality of the image and the disease stage."
/>
<FAQ
  question="What should I do if the app does not recognize the disease?"
  answer="If the app doesn't recognize the disease, ensure that the photo is clear and the affected area is visible. If problems persist, you can reach out to our support team for further assistance."
/>
<FAQ
  question="How can I improve the accuracy of disease detection?"
  answer="For best results, take photos in good lighting without shadows. Ensure the affected area of the plant is clearly visible and fills the frame. Avoid blurry images for more accurate analysis."
/>
<FAQ
  question="Does the app offer solutions or treatments for detected diseases?"
  answer="Yes, once a disease is detected, the app provides recommendations for remedies and treatments, including natural and chemical options, to help you manage the disease effectively."
/>
<FAQ
  question="Is my data and privacy protected when using the app?"
  answer="Absolutely. Your privacy is our top priority. Photos uploaded for analysis are only used to provide diagnoses and are not stored or used for any other purposes without your consent."
/>

        {/* Add more FAQs here */}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0', // Optional: Changes the background color of the whole screen for contrast
      marginBottom: 75,
    },
    header: {
      fontSize: 24, // Slightly larger for emphasis
      fontWeight: 'bold',
      color: '#023020',
      marginBottom: 30, // Increased spacing from the header to the first question
      textAlign: 'center'
    },
    question: {
      fontSize: 20, // Increased font size for better readability
      fontWeight: 'bold',
      color: '#000000', // White text color for contrast
      backgroundColor: '#FFFFFF', // Theme color or any color that fits your app design
      padding: 15, // Increased padding for a larger touch area
      borderRadius: 10, // Rounded corners for a softer look
      shadowColor: '#000', // Shadow for depth
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4, // Elevation for Android shadow
      marginBottom: 10, // Space between each question
      overflow: 'hidden', // Ensures no child component (like the shadow) bleeds outside the border radius
    },
    answer: {
      fontSize: 18, // Slightly larger for coherence with the question size
      color: '#555',
      marginTop: 5, // Reduced space above the answer to keep it closer to the question
      marginBottom: 20, // Space after the answer, before the next question
      paddingLeft: 20,
      paddingRight: 20, // Padding on the right for better text alignment
      textAlign: 'justify', // Justify the text for a cleaner look
    },
  });
  
export default FAQScreen;
