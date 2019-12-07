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
import firestore from '@react-native-firebase/firestore';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin';


export default class LoginPage extends Component {

    static navigationOptions = {
        title: 'Profile',
    };

    auth = null;
    profile = null;

    constructor(props) {
        super(props);

        this.auth = this.props.navigation.getParam('auth', null);
        this.profile = this.auth.user;
    }

    async componentDidMount() {
        // Read the users documents
        await this.getFirestoreDataForThisUser();
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        // remove listeners here
    }

    async getFirestoreDataForThisUser() {
        const muid = this.profile.uid;
        console.log('Getting firestore data under document name: ', muid);

        // Check if the doc exists
        const querySnapshot = await firestore()
            .collection('users')
            .doc(muid)
            .get();

        const data = querySnapshot.data();

        if (data) {
            // handle data
            // console.log('User data', data);

            const mUserWorkoutsQuerySnapshot = await firestore()
                .collection('users')
                .doc(muid)
                .collection('workouts')
                .get();

            if ( mUserWorkoutsQuerySnapshot.size !== 0) {
                console.log(mUserWorkoutsQuerySnapshot);
                console.log('Total workouts', mUserWorkoutsQuerySnapshot.size);
                console.log('Workout documents', mUserWorkoutsQuerySnapshot.docs);

            } else {
                console.log('user has no workouts');
            }

        } else {
            // no data yet. Create DB entry
            console.log('No data. Creating user database entry');
            const querySnapshot = await firestore()
                .collection('users')
                .doc(muid)
                .set({
                    email: this.profile.email,
                    name: this.profile.displayName,
                    locale: this.auth.additionalUserInfo.profile.locale,
                    uid: this.profile.uid,
                });
        }
    }


    render() {

        const user = this.profile;

        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>

                    <Image
                        source={{ uri: user.photoURL }}
                        style={styles.userPicture} />

                    <View style={{ ...styles.profileContainer, flexDirection: 'column' }}>
                        <Text>{user.email}</Text>
                        <Text>{user.displayName}</Text>
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