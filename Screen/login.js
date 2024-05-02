import React from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logoImage from '../assets/logo.png';
import CustomButton from '../component/CustomButton';
import InputField from '../component/InputField';

const LoginScreen = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 100, android: 100 })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: 'white' }}
      >
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Image source={logoImage} style={{ height: 150, width: 150 }} />
        </View>
        <View style={{ paddingHorizontal: 25 }}>
          <Text style={{ fontSize: 28, fontWeight: '500', color: '#333', marginBottom: 30 }}>
            Login
          </Text>

          <InputField
            label={'Email ID'}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
          />

          <InputField
            label={'Password'}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
          />

          <CustomButton label={"Login"} onPress={()=>navigation.navigate('Profile' )} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginTop: 30 }}>
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Sign up' )}>
              <Text style={{ color: '#023020', fontWeight: '700', marginLeft: 5 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
