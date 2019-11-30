// App.js

import React, { Component } from 'react';


import Test from './src/Components/Test';


export default class App extends Component {

    // Don't need to declare this unless you want to actually use it
   constructor() {
      super();
      console.log('constructor of App');
   }


   render() {
      return (
         <Test/>
      );
   }
}
