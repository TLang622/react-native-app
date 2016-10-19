/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Navigator from './app/navigator';
AppRegistry.registerComponent('reactApp', () => Navigator);
