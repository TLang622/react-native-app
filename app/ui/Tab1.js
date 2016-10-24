import React, { Component, PropTypes } from 'react';
import Storage from 'react-native-storage';
import { 
  Navigator,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import Toolbar from '../lib/Toolbar';
import Index from '../ui/Index';

export default class Tab1 extends Component {
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
  componentDidMount() {
    console.log(this.props.data.length)
  }
  render() {
    return (
      <Navigator
        style={{flex:1, flexDirection:'column-reverse'}}
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        configureScene = {(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={<Toolbar title={this.props.name} onIcon ={this.onIcon.bind(this)}/>}
        sceneStyle={{}}
        renderScene={(route, navigator) =>    
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
      <View style={{flex:1}}>
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
