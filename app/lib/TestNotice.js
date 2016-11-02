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
import Tab2 from '../ui/Tab2';

export default class TestNotice extends Component {
 	constructor(props) {
   	super(props);
  }
  componentDidMount() {
    storage.load({
      key: 'questionsUntreated',
    }).then(ret => {
      this.questionsData = [];
      for(var i=0; i<this.props.data.hash.length; i++) {
        for(var j=0; j<ret.length; j++) {
          if(this.props.data.hash[i] == ret[j].hash) {
            this.questionsData.push(ret[j]);
          }
        }
      }
      //console.log(this.questionsData.length);
    }).catch(err => {
      
    });
  }
  onTest() {
    const { navigator } = this.props.nav;
    if (navigator) {
        navigator.push({
          name : 'Tab2',
          component : Tab2,
          params: {
            name: this.props.name,
            data: this.questionsData,
            time: this.props.data.examperiod
          }
        });
      }
  }
  render() {
    return (
      <View >
        <Text>科目: {this.props.data.examname}</Text>
        <Text>题量: {this.props.data.hash.length}</Text>
        <Text>时限: {this.props.data.examperiod/60}</Text>
      	<Text>考试须知: 考试不能中途退出，如有退出分数则按零分处理</Text>
        <TouchableOpacity onPress={this.onTest.bind(this)}>
          <Text>点击开考</Text>
        </TouchableOpacity>
      </View>
    )
  }
}