//Settings Screen
import React, { Component } from 'react';
//import react in our code.
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
// import all basic components


//Class for the navigation drawer.
export default class NavigationDrawerStructure extends Component {

    constructor(props) {
        super(props);
    }

    // toggleDrawer = () => {
    //     //Props for the drawer toggle.
    //     this.props.navigationProps.toggleDrawer();
    // };

    render() {
        console.log('Render the drawer');
        return (

            <ScrollView>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: 'always', horizontal: 'never' }}
                >

                    <View style={styles.header}>

                        <Image
                            source={require('../Assets/react-icon.png')}
                            style={{ width: 100, height: 100, margin: 2 }}
                        />
                        <Text>This is the drawer header</Text>
                    </View>


                    <DrawerItems {...this.props} />

                </SafeAreaView>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        paddingBottom: 10,
    },
});