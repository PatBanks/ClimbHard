//Settings Screen
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components



//Class for the navigation drawer.
class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    //Props for the drawer toggle.
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../drawer.png')}
            style={{ width: 25, height: 25, marginRight: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default NavigationDrawerStructure;
