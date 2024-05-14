import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import contactData from './contact.json'

import Profile from './Profile'

const ProfileScreen = () => (
    <ScrollView>
      <Profile {...contactData} />
    </ScrollView>
  );
ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen