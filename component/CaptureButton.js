import React, { useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CaptureButton = ({ onPress, imageSource }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(onPress); // Call onPress directly after animation
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableOpacity
      style={styles.captureButton}
      onPressIn={animatePress}
      activeOpacity={1}
    >
      <Animated.View style={[styles.captureButtonInner, animatedStyle]}>
        <Image source={imageSource} style={styles.imageIcon} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70, // Button size
    height: 70, // Button size
    borderRadius: 35,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    margin:15,
  },
  captureButtonInner: {
    width: 60, // Adjusted to fit within the button
    height: 60, // Adjusted to fit within the button
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 130, // Adjusted to fit well within the button
    height: 130, // Adjusted to fit well within the button
    resizeMode: 'contain',
  },
});

export default CaptureButton;
