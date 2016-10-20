import React, { Component, PropTypes } from 'react';
import Storage from 'react-native-storage';
import { 
	Navigator,
	Text,
	TouchableHighlight,
	View,
	AsyncStorage 
} from 'react-native';
import Toolbar from '../lib/Toolbar';
import Index from '../ui/Index';

export default class Tab5 extends Component {
	constructor(props){
        super(props);
        this.state = {};
    }
	onIcon(){
		const { navigator } = this.props;
    if (navigator) {
      navigator.push({
        name : 'Index',
        component : Index,
      });
    }
	}
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        configureScene = {(route) => {
          return Navigator.SceneConfigs.FloatFromBottomAndroid;
        }}
        renderScene={(route, navigator) =>
        	<View>
        		<Toolbar onIcon ={this.onIcon.bind(this)}/>
        		<MyScene
	            title={route.title}        
	            onForward={ () => {    
	              const nextIndex = route.index + 1;
	              navigator.push({
	                title: 'Scene ' + nextIndex,
	                index: nextIndex,
	              });
	            }}
	            onBack={() => {
	              if (route.index > 0) {
	                navigator.pop();
	              }
	            }}
	          />
        	</View>
        }
      />
    )
  }
}

class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}