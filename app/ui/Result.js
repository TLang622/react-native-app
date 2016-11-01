import React, { Component, PropTypes } from 'react';
import Storage from 'react-native-storage';
import { 
  Navigator,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
  TouchableOpacity,
  ListView,
  ToastAndroid,
  Alert,
  PanResponder
} from 'react-native';
import Index from '../ui/Index';
import Analysis from '../ui/Analysis';

export default class Tab1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  componentWillMount() {
   //console.log(this.props.savedData);
   var answerDeal = [];
   const az = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z'];
   this.rightNum = 0;
   this.errNum = 0;
   this.errorNote = [];
   for(var i=0; i<this.props.savedData.length; i++) {
      var answerDeal = '';
      var selectedDeal = '';
      for(var k=0; k<this.props.savedData[i].answer.length; k++) {
        if(this.props.savedData[i].answer[k] === '1') {
          answerDeal += az[k];
        }
      }
      for(var j=0; j<this.props.savedData[i].selected.length; j++) {
        selectedDeal += this.props.savedData[i].selected[j];
      }
      if(answerDeal == selectedDeal) {
        this.rightNum += 1;
      }else{
        this.errNum += 1;
        this.errorNote.push(this.props.savedData[i]);
        this.props.savedData[i].date = new Date();
        storage.save({
          key: 'errorNote',
          id: this.props.savedData[i].hash,
          rawData: this.props.savedData[i]
        });
      }
   }
   this.leftNum = this.props.data.length - this.rightNum - this.errNum;
   this.score = parseInt(100/this.props.data.length*this.rightNum);
   storage.getAllDataForKey('errorNote').then(ret => {
      console.log(ret);
    });

  }

  onAllAnalysis() {
    const { navigator } = this.props;
    if (navigator) {
      navigator.push({
        name : 'Analysis',
        component : Analysis,
        params: {
          name: '试题分析',
          data: this.props.data,
        }
      });
    }
  }
  onErrAnalysis() {
    const { navigator } = this.props;
    if (navigator && this.errorNote) {
      navigator.push({
        name : 'Analysis',
        component : Analysis,
        params: {
          name: '试题分析',
          data: this.errorNote,
        }
      });
    }
  }
  render() {
    return (
      <View>
        <Text>总成绩: {this.score} 分</Text>
        <Text>做对: {this.rightNum}</Text>
        <Text>做错: {this.errNum}</Text>
        <Text>未做: {this.leftNum}</Text>
        <TouchableOpacity onPress={this.onAllAnalysis.bind(this)}>
          <Text>全部解析</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onErrAnalysis.bind(this)}>
          <Text>错误解析</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
