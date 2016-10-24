import React, { Component, PropTypes } from 'react';
import Storage from 'react-native-storage';
import { 
	Navigator,
	Text,
	TouchableHighlight,
	View,
	AsyncStorage,
	ToolbarAndroid,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';

export default class Toolbar extends Component {
 	constructor(props) {
   	super(props);
  }
  render() {
    return (
      <View style={styles.toolbar}>
      	<TouchableOpacity onPress={this.props.onIcon}>
					<Image source={require('../image/icon.png')} />
      	</TouchableOpacity>
      	<Text>{this.props.title}</Text>
      </View>
    )
  }

	onIconClicked(){
		const { navigator } = this.props;
		alert(navigator)
      if (navigator) {
        navigator.push({
          name : 'Tab2',
          component : Tab2,
        });
      }
	}
}
const styles =StyleSheet.create({  
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 60,
    flexDirection: 'row',
  },  
}); 