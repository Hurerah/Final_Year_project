import {React, useEffect, useState} from 'react';
//const LoginContext = React.createContext({ statusss: '', setStatusss: () => {} });

import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logoImage from '../assets/logo.png';
import CustomButton from '../component/CustomButton';
import InputField from '../component/InputField';
import axios  from 'axios';
import IP_ADDRESS from '../config'

const LoginScreen = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [messagee, setmessagee] = useState('');
  const [statuss, setstatuss] = useState('');
  const [dataa, setdataa] = useState('');
  const [errorr, seterrorr] = useState('');
  // const keyObject = { email };
  const keyString = JSON.stringify(email); // Convert object key to string

  useEffect(() => {
    if (statuss === 'SUCCESS') {
      
      
      navigation.navigate('Homee');;
    }
  }, [statuss]);
  
const  authenticateUserFromStorage =  async() => {
  try {
    const storedPassword = await AsyncStorage.getItem(email);
    console.log(email,'password  ',password,'password :: ',storedPassword)
    if (storedPassword === password) {
      console.log('User authenticated.');
      setmessagee('User authenticated.');
      setstatuss('SUCCESS');
      //handleLogin(); // Assuming this is a function to handle login failure
      return true;
    } else {
      console.log('Invalid credentials.');
      setmessagee('Invalid credentials.');
      setstatuss('Failed');
      return false;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    setmessagee('Authentication error:');
    setstatuss('Failed');
    return false;
  }
};
  
  const handlelogin =()=>{
      console.log('helo',email, password)
      axios.post( `http://${IP_ADDRESS}:3000/user/signin`, {
        email: email,
        password: password
      })
      .then(response => {
        
        const result=response.data
        const {message, status,data} =result;
        console.log(status,message,data)
        setmessagee(message)
        setstatuss(status)
        setdataa(data)
      })
      .catch(error => {
        console.log('Login failed:', error);
        seterrorr(error)
      });
    }
  
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
            value={email}
            onChangeText={setemail}
          />

          <InputField
            label={'Password'}
            icon={
              <MaterialIcons
              name="lock"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            }
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
            value={password}
            onChangeText={setPassword}
          />
             <Text style={{ color:'red',  justifyContent: 'center', marginBottom: 10, marginTop: 10 }}> 
            {statuss}: {messagee}
          </Text>
          
          <CustomButton label={"Login"} onPress={authenticateUserFromStorage} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginTop: 30 }}>
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Signup' )}>
              <Text style={{ color: '#023020', fontWeight: '700', marginLeft: 5 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
