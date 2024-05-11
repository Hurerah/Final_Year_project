import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

//import DatePicker from 'react-native-date-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../component/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../component/CustomButton';
import logoImage from '../assets/logo.png';
import axios from 'axios';
import IP_ADDRESS from '../config'
const RegisterScreen = ({navigation}) => {
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [dataa, setdataa] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [username, setusername] = useState('');
  const [contact, setcontact] = useState('');
  const [messagee, setmessagee] = useState('');
  const [statuss, setstatuss] = useState('');
  useEffect(() => {
    if (statuss === 'SUCCESS') {
      setPassword('')
      setemail("")
      setusername('')
      setCnfPassword('')
      setDate('')
      navigation.navigate('Homee');;
    }
  }, [statuss]);
    // Function to save username and password to AsyncStorage
  const saveCredentialsToStorage = async (email, password) => {
    try {
      await AsyncStorage.setItem(email, password);
      console.log('Credentials saved to AsyncStorage.');
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };
  const handlesignup =()=>{
    
      console.log('helo',email, password)
      axios.post( `http://${IP_ADDRESS}:3000/user/signup`, {
        username:username,
        email: email,
        password: password,
        cnf_password:cnfPassword,
        dateOfBirth:date
      })
      .then(response => {
        
        const result=response.data
        const {message, status,data} =result;
        
        console.log(status,message,data)
        setmessagee(message)
        setstatuss(status)
        setdataa(data)
        saveCredentialsToStorage(email,password)
        console.log('storage ',AsyncStorage.getAllKeys());
      })
      .catch(error => {
        console.log('signup failed:', error);
        
      });
    }
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        
        <View style={{alignItems: 'center'}}>
            {/* Using an Image component instead of SVG */}
            <Image
              source={logoImage}
              style={{height: 130, width: 130,paddingTop:200}}
            />
          </View>
        
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginTop: 30, // Adjusted for removed SVG
            marginBottom: 30,
          }}>
          Register
        </Text>


        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={username}
          onChangeText={setusername}
        />

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
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
          value={password}
          onChangeText={setPassword}
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <MaterialIcons
              name="lock"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          value={cnfPassword}
          onChangeText={setCnfPassword}
        />


        
            <InputField
          label={'Date Of Birth (2000-12-11)'}
          icon={
            <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          value={date}
          onChangeText={setDate}
          
         />
          <Text style={{ color:'red',  justifyContent: 'center', marginBottom: 10, marginTop: 10 }}> 
            {statuss}: {messagee}
          </Text>
        <CustomButton label={'Register'} onPress={handlesignup} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Login' )}>
            <Text style={{color: '#008000', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
