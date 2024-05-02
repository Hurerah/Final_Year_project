import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native';

const CustomHeader = ({title}) => {
  focused=useIsFocused()
   const labels = {
      Home: 'Home',
      Updates: 'Updates',
      Settings: 'Settings',
      Profilee: 'Profile',
    };
    const headerTitle = labels[title] || title;
  return (
    <View style={styles.headerContainer}>
    
      <Text style={styles.headerTitle}>{headerTitle}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#023020',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0, // Adjust for status bar height on iOS
    marginHorizontal: 10,
    elevation: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFF',
    textAlign: 'center',
    paddingBottom: 0,
  },
  iconButton: {
    padding: 10,
  },
});
export default CustomHeader