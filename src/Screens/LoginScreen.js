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

import reactIcon from '../react-icon.png';

import { firebase } from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin';


export default class LoginPage extends Component {

    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);

        this.state = {
            firebaseAuth: null,
            authenticated: false,
            isSigninInProgress: true,
            username: null,
            password: null,
        };
    }

    async componentDidMount() {

        // When this screen mounts, try to log in silently. 
        await this._signInBackgroundSilently();
    }

    componentDidUpdate() {
        if (this.state.firebaseAuth) {

            const { navigation } = this.props;
            //navigate
            navigation.navigate('Profile', {auth: this.state.firebaseAuth});
        }
    }

    componentWillUnmount() {
        // remove listeners here
    }

    // Try to sign in in the background automatically
    async _signInBackgroundSilently() {
        try {
            console.log('Trying to log current user into firebase');
            const userInfo = await GoogleSignin.signInSilently();
            await this._firebaseSignIn(userInfo);
        } catch (error) {
            console.log('Could not log in silently.');
            this.setState({ isSigninInProgress: false, });
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet');
            } else {
                console.log('Other error doing background signin', error);
            }
        }
    }


    // Sign in with google to get tokens
    async _signInWithGoogleButtonAction() {
        let self = this;

        // Update state to show loading icon during signin
        self.setState({ isSigninInProgress: true });

        // Credientials is initd to null
        let userInfo;

        try {
            console.log('doing google button login action');
            await GoogleSignin.hasPlayServices();

            userInfo = await GoogleSignin.signIn();

            await this._firebaseSignIn(userInfo);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated');
            } else {
                console.log('some other error in signIn:', error);
            }
        }
    }

    async _firebaseSignIn(userInfo) {
        if (userInfo !== null) {
            // Did get user info from GoogleSignin.signin()
            console.log('Doing Firebase auth');

            // Create firebase credential with the tokens
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken);

            // Signin to Firebase with the created credential
            const res = await firebase.auth().signInWithCredential(credential);
            if (res) {
                console.log('firebase auth result', res);
                this.setState({
                    isSigninInProgress: false,
                    authenticated: true,
                    firebaseAuth: res,
                });
            }
        }
    }


    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={reactIcon}
                        style={styles.logo} />

                    {!this.state.authenticated &&
                        <GoogleSigninButton
                            style={{ width: 230, height: 48 }}
                            size={GoogleSigninButton.Size.Standard}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => { this._signInWithGoogleButtonAction() }}
                            disabled={this.state.isSigninInProgress} />
                    }

                    {this.state.firebaseAuth &&
                        <Text>{JSON.stringify(this.state.firebaseAuth, null, 4)}</Text>
                    }

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    logo: {
        width: 250,
        height: 250,
        padding: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
    },
    textInput: {
        height: 40,
        borderColor: '#111111',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },
});