// LoginPage.js

import React, { Component } from 'react';
import {
   Platform,
   StyleSheet,
   Text,
   View,
   TextInput,
   SafeAreaView,
   Button,
   Image,
} from 'react-native';

import reactIcon from '../react-icon.png';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class LoginPage extends Component {

   constructor() {
      super();
      this.state = {
         authenticated: false,
         username: null,
         password: null,
      };
   }

   componentDidMount() {

   }

   componentWillUnmount() {
      // remove listeners here
   }

   handleLoginPress() {

   }

   render() {

      return (
         <View style={styles.container}>

            <View style={styles.form}>
               <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ username: text })}
                  autoCapitalize='none'
                  autoCompleteType='username'
                  textContentType='username'
                  keyboardType='email-address'
                  multiline={false}
                  placeholder='Enter your email address'
                  returnKeyType='next'
                  secureTextEntry={false} />

               <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({ username: text })}
                  autoCapitalize='none'
                  autoCompleteType='password'
                  textContentType='password'
                  keyboardType='default'
                  multiline={false}
                  placeholder='Enter your email address'
                  returnKeyType='done'
                  secureTextEntry={true} />

               <Button title='Log In' onPress={this.handleLoginPress} />

            </View>

            <Image 
               source={reactIcon}
               styles={styles.logo} />

         </View>

      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#eFeFeF',
      alignItems: "center",
      justifyContent: 'space-between',
   },
   logo: {
      flex: 1,
      width: '25%',
      resizeMode: 'contain',
      alignSelf: 'center',
   },
   form: {
      flex: 1,
      justifyContent: 'center',
      width: "80%",
   },
   textInput: {
      height: 40,
      borderColor: '#111111',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 20,
   },
});