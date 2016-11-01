import React, { Component, PropTypes } from 'react';
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
import Toolbar from '../lib/Toolbar';
import Index from '../ui/Index';

export default class Tab1 extends Component {
  constructor(props){
    super(props);
  }
  onIcon(){
    const { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }
  render() {
    return (
      <Navigator
        style={{flex:1, flexDirection:'column-reverse'}}
        initialRoute={{ title: '1\/' + this.props.data.length, index: 1 }}
        configureScene = {(route) => {
          return Navigator.SceneConfigs.FadeAndroid;
        }}
        navigationBar={<Toolbar title={this.props.name} onIcon ={this.onIcon.bind(this)}/>}
        sceneStyle={{}}
        renderScene={(route, navigator) => {
          return (  
            <MyScene
              title={route.title}
              index ={route.index}
              data={this.props.data}        
              onForward={ () => {    
                const nextIndex = route.index + 1;
                if(nextIndex > this.props.data.length) {
                  alert('这是最后一题了');
                  return;
                }
                navigator.push({
                  title: nextIndex + '\/' + this.props.data.length,
                  index: nextIndex,
                });
              }}
              onBack={() => {
                const preIndex = route.index - 1;
                if (route.index > 1) {
                  navigator.push({
                    title: preIndex + '\/' + this.props.data.length,
                    index: preIndex,
                  });
                }
              }}
            />
          )}
        }
      />
    )
  }
}
class MyScene extends Component {
  constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var choice = this.props.data[this.props.index - 1].choice.split('|||');
        const az = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z'];
        choice = choice.map(function(value, index) {
          return az[index] + ' ' + value;
        });
        const answer = this.props.data[this.props.index - 1].answer;
        var anserDeal = '';
        for(var i=0; i<answer.length; i++) {
            if(answer[i] === '1') { 
              anserDeal += az[i]; 
            }
        };
        this.state = {
          dataSource: ds.cloneWithRows(choice),
          answer: anserDeal,
        };
    }
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  question_type() {
    switch(this.props.data[this.props.index - 1].question_type) {
      case '10':
        return '判断题'
        break;
      case '11':
        return '单选题'
        break;
      case '12':
        return '不定项'
        break;
      default:
        return '未知题型'
      
    }
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx > 20) {
          this.props.onBack();
        }else if(gestureState.dx < -20) {
          this.props.onForward();
        }
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminationRequest: (evt, gestureState) => {
        // 另一个组件尝试成为新的响应者，
        return false;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}} {...this._panResponder.panHandlers}>
          <Text>{ this.props.title }</Text>
          <Text>{ this.props.data[this.props.index - 1].question }</Text>
          <Text>{ this.question_type() }</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
          <View>
            <Text>正确答案：{this.state.answer}</Text>
            <Text>解析：</Text>
            <Text>{this.props.data[this.props.index - 1].explanation}</Text>
          </View>
        </View>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>下一题</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>前一题</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
