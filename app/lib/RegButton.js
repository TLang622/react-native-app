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

export default class RegButton extends Component {
  constructor(props) {
   super(props);
   this.state = {text: ''};
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressCallback} style={RegStyles.regTextView}>
        <Text style={RegStyles.regText} >
            {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const RegStyles = StyleSheet.create({
  regText: {
    color: '#ffffff',
     fontWeight: 'bold',
     width:30,
  },
  regTextView: {
    marginTop: 10,
    height:50,
    backgroundColor: '#3281DD',
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
});