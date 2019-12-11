// App.js

import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {
    GoogleSignin,
} from '@react-native-community/google-signin';
import { View, Image, TouchableOpacity } from 'react-native';

import NavigationDrawerStructure from './src/Screens/NavigationDrawerStructure';
import LoginPage from './src/Screens/LoginScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import WorkoutScreen from './src/Screens/WorkoutScreen';


//The main course.
const PostLoginStack = createStackNavigator({
  Profile: {
    screen: 'ProfileScreen',
    initialRouteName: 'Profile',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
    }),
  },
});

//Create your environment. The world is your oyster.
const SettingsStack = createStackNavigator({
  Settings: {
    screen: 'SettingsScreen',
    initialRouteName: 'Settings',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
    }),
  },
});

//Look at all these fabulous workouts.
//That's right. Nothing.
const WorkoutStack = createStackNavigator({
  Workouts: {
    screen: 'WorkoutScreen',
    initialRouteName: 'Workout',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          fontWeight: 'bold',
      },
    }),
  },
});

//PreLogin stack. It's the login page, however it authenticates
//automatically if you've signed in before with google.
//Thanks googs.
const PreLoginStack = createStackNavigator(
    {
        Login: { screen: LoginPage },
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
    },
);

//The contents of the drawer.
//better than your sock drawer.
const DrawerNavigator = createDrawerNavigator({
  PostLogin: {
    screen: PostLoginStack,
    navigationOptions: {
      drawerLabel: 'Profile',
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      drawerLabel: 'Settings',
    }
  },
  Workouts: {
    screen: WorkoutStack,
    navigationOptions: {
      drawerLabel: 'Workouts',
    }
  },
},
{
  initialRouteName: 'PostLogin',
  headerMode: 'screen',
})


//Base Stack Navigator. Contains the Prelogin page and the drawer.
const RootNavigator = createStackNavigator(
    {
        PreLogin: { screen: PreLoginStack },
        Drawer: { screen: DrawerNavigator},
        //PostLogin: { screen : PostLoginStack },
    },
    {
        initialRouteName: 'PreLogin',
        headerMode: 'none',
    },
);


//create the container for the root navigator. This should
//create the containers for the rest of them too I think?
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
    //Render just the Root Nav Container? Does this render everything else?
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
