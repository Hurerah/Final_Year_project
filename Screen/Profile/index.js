import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  // Import SafeAreaView
import PropTypes from 'prop-types';
import contactData from './contact.json';

import Profile from './Profile';

const ProfileScreen = () => (
  <SafeAreaView 
    edges={['bottom']} 
    style={{ flex: 1, paddingBottom: 50 }}  // Added paddingBottom here
  >
    <ScrollView>
      <Profile {...contactData} />
    </ScrollView>
  </SafeAreaView>
);

ProfileScreen.navigationOptions = () => ({
  header: null,
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
