// App.js

import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    GoogleSignin,
} from '@react-native-community/google-signin';


import LoginPage from './src/Screens/LoginScreen';
import ProfileScreen from './src/Screens/ProfileScreen';

const RootNavigator = createStackNavigator(
    {
        Login: { screen: LoginPage },
        Profile: { screen: ProfileScreen },
    },
    {
        initialRouteName: 'Login',
        headerMode: 'float',

        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
);

const RootNavContainer = createAppContainer(RootNavigator);

export default class App extends Component {

    constructor() {
        super();
        console.log('***************** Run App ***********************');

        this.state = {
            doneConfigureGoogle: false
        };
    }

    async componentDidMount() {
        await this.bootstrapGoogleSignin();
    }

    // Only needs to be called once during the entire lifecycle of the app
    async bootstrapGoogleSignin() {
        console.log('Configuring google sign-in: This should only be called once.');
        await GoogleSignin.configure({
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            webClientId: '655046320725-cu1bvg3104cd8nkios1q04ql741pme15.apps.googleusercontent.com',
        });
        this.setState({ doneConfigureGoogle: true });
    }


    render() {
        if (this.state.doneConfigureGoogle) {
            return (
                <RootNavContainer />
            );
        } else {
            return (<></>);
        }

    }
}
