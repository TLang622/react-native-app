import React, { Component, PropTypes } from 'react';
import Storage from 'react-native-storage';
import { 
	Navigator,
	Text,
	TouchableHighlight,
	View,
	AsyncStorage,
	ToolbarAndroid,
	StyleSheet 
} from 'react-native';

export default class Toolbar extends Component {
	constructor(props) {
   super(props);
  }
  render() {
    return (
      <ToolbarAndroid
	      navIcon ={require('../image/login.png')}
	      style={styles.toolbar}
	      title="标题"
	      actions={[{title: 'Settings', icon: require('../image/login.png'), show: 'always'}]}
	      onActionSelected={this.onActionSelected}
	      onIconClicked ={this.props.onIcon} 
	       />
    )
  }
  onActionSelected(position) {
	  alert(position)
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
    height: 56,  
  },  
}); 