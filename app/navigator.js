import React, { Component } from 'react';
import Storage from 'react-native-storage';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';
import Main from './ui/Main';
import Index from './ui/Index';

export default class navigator extends Component {
   constructor(props) {
     super(props);
     this.state = {
      defaultName: 'Index',
      defaultComponent: Index,
     }
   }

   render() { 
    return (
      <Navigator
        initialRoute = {{name : this.state.defaultName , component: this.state.defaultComponent}}
        configureScene = {(route) => {
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }}
        renderScene={(route,navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator = {navigator} />
        }}
        />
    );
  }
};