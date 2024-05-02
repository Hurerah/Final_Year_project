import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Animated } from 'react-native';

const LoadingScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1, // Fade in to opacity: 1
        duration: 1000, // Duration of 1000ms
        useNativeDriver: true, // Add this line
      }
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
      <ActivityIndicator size="large" color="#AFE1AF" />
      <Text style={styles.loadingText}>Loading...</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default LoadingScreen;
