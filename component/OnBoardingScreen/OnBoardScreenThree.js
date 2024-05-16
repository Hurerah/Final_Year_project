import { useEffect } from 'react';
import React from 'react';
import { Card, Button } from 'react-native-paper';
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';
import Dots from 'react-native-dots-pagination';
import { useNavigation } from '@react-navigation/native';
import ScreenOne from '../../assets/OnBoard3.png';

const OnBoardingScreenThree = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 1000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <Button
          mode="contained"
          textColor={'black'}
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          Skip
        </Button>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={ScreenOne}
          style={styles.logo}
          resizeMode="contain"
        ></Image>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome To Leaf Care</Text>
            <Text style={styles.content}>
            High-accuracy with precise insights for effective crop management
            </Text>
          </View>

          <View style={styles.paginationContainer}>
            <Dots
              length={3}
              active={2}
              activeColor="#230"
              activeDotHeight={height * 0.03} // Example of using percentage of screen height
            />
            {/* <Button
              mode="contained"
              style={styles.nextButton}
              onPress={() => {
                navigation.navigate('HomeStackScreen');
              }}
            >
              Next
            </Button> */}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  appbar: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: height * 0.05, // Example of using percentage of screen height
    paddingRight: width * 0.05, // Example of using percentage of screen width
  },
  button: {
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1, // Example of using percentage of screen height
    paddingBottom: 20,
  },
  logo: {
    width: "165%",
    height: "165%", // Example of using percentage of screen height
    
  },
  card: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: height * 0.05, // Example of using percentage of screen height
    borderRadius: 0,
    borderTopLeftRadius: height * 0.05, // Example of using percentage of screen height
    borderTopRightRadius: height * 0.05, // Example of using percentage of screen height
    paddingHorizontal: width * 0.05, // Example of using percentage of screen width
  },
  contentContainer: {
    flex: 2,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: height * 0.04, // Example of using percentage of screen height
    color: '#000000',
    marginBottom: height * 0.02, // Example of using percentage of screen height
  },
  content: {
    fontSize: height * 0.023, // Example of using percentage of screen height
    color: "#023020",
    textAlign: 'center',
    //marginBottom: height * 0.02
  },
  paginationContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05, // Example of using percentage of screen height
  },
  nextButton: {
    backgroundColor: '#230',
    height: height * 0.08, // Example of using percentage of screen height
    width: width * 0.5, // Example of using percentage of screen width
    borderRadius: height * 0.04, // Example of using percentage of screen height
    justifyContent: 'center',
  },
});

export default OnBoardingScreenThree;