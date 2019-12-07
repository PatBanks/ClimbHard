// LoginPage.js

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    Image,
} from 'react-native';
// var StyleSheet = require('react-native-debug-stylesheet');

import reactIcon from '../react-icon.png';

import { firebase } from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin';


export default class LoginPage extends Component {

    static navigationOptions = {
        title: 'Profile',
    };

    constructor(props) {
        super(props);

        this.state = {
            auth: this.props.navigation.getParam('auth', null),
        };
    }

    async componentDidMount() {

    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        // remove listeners here
    }



    render() {

        const user = this.state.auth.additionalUserInfo.profile;

        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>

                    <Image
                        source={{ uri: user.picture }}
                        style={styles.userPicture} />

                    <View style={{...styles.profileContainer, flexDirection: 'column'}}>
                        <Text>{user.email}</Text>
                        <Text>{user.given_name + ' ' + user.family_name}</Text>
                    </View>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    profileContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    userPicture: {
        width: 100,
        height: 100,
        margin: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});