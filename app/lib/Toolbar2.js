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
	TouchableOpacity,
  Alert
} from 'react-native';

export default class Toolbar extends Component {
 	constructor(props) {
   	super(props);
    this.state = {
      hour: '00',
      minute: '00',
      second: '00',
    };
  }
  componentDidMount() {
    //设置考试时间，默认45分钟
    var leftTime=1*60*1000;
    this.timer = setInterval(() => { 
      var leftsecond = parseInt(leftTime/1000);
      var day=Math.floor(leftsecond/(60*60*24)); 
      var hour=Math.floor((leftsecond-day*24*60*60)/3600); 
      var minute=Math.floor((leftsecond-day*24*60*60-hour*3600)/60); 
      var second=Math.floor(leftsecond-day*24*60*60-hour*3600-minute*60);
      leftTime -= 1000; 
      if(day <=0 && hour <=0 && minute <=0 && second <=0) {
        this.timer && clearTimeout(this.timer);
        //时间到了，这里还要处理考试结果的
        alert('考试结束');
        this.props.onSubmit();
      }
      this.setState({
        hour: hour<10 ? '0'+hour : hour,
        minute: minute<10 ? '0'+minute : minute,
        second: second<10 ? '0'+second : second,
      });
    }, 1000);
    
  }
  componentWillReceiveProps() {
    this.timer && clearTimeout(this.timer);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return (
      <View style={styles.toolbar}>
      	<TouchableOpacity onPress={() => Alert.alert(
            '',
            '是否退出考试',
            [
              {text: '确定', onPress: () => this.props.onIcon()},
              {text: '取消', onPress: () => console.log('取消')},
            ]
          )}>
					<Image source={require('../image/icon.png')} />
      	</TouchableOpacity>
        <Text>{this.state.hour}:{this.state.minute}:{this.state.second}</Text>
        <Text>{this.props.title}</Text>
      	<TouchableOpacity onPress={this.props.onList}>
          <Image source={require('../image/icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert(
            '',
            '是否提交考试',
            [
              {text: '确定', onPress: () => this.props.onSubmit()},
              {text: '取消', onPress: () => console.log('取消')},
            ]
          )}>
          <Image source={require('../image/icon.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles =StyleSheet.create({  
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 60,
    flexDirection: 'row',
  },  
}); 