import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  View,
  Text,
  StyleSheet,
  ListView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
var THUMB_URLS = [
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  require('./imgs/ic_order_status_jiedan.png'),
  ];
class HelloWorldApp extends Component {
  render() {
    return (
        <Navigator
          initialRoute={{id:'main'}}
          renderScene={(route, navigator) => {
            switch(route.id) {
              case 'main':
                return <MainScreen navigator={navigator} title='Main' />
              case 'tab1':
                return <MovieView navigator={navigator} onBack={() => {navigator.pop()}} title='tab1' />;
              case 'login':
                return <LoginView navigator={navigator} />
              case 'regist':
                return <RegistView navigator={navigator} />
            }
        }}
        />
      );
  }
}
class MainScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8','row 9','row 10','row 11','row 12','row 13','row 14','row 15'
      ])
    };
  }
  _pressRow() {
    this.props.navigator.push({
      id: 'tab1',
    })
  }
  _renderRow(rowData, sectionID, rowID) {
    var imgSource = THUMB_URLS[rowID];
    return (
      <TouchableOpacity onPress={this._pressRow.bind(this)}>
        <View>
          <View style={styles.row}>
              <Image style={styles.thumb} source={imgSource} />
              <Text style={{flex:1,fontSize:16,color:'blue'}}>
                {rowData + '前面的那些是数据来的哦'}
              </Text>
            </View>
        </View>
      </TouchableOpacity>
    )
  };
  _pressLogin() {
    this.props.navigator.push({
      id: 'login'
    })
  }
  _pressRegist() {
    this.props.navigator.push({
      id: 'regist'
    })
  }
  render() {
    return (
      <ScrollableTabView tabBarPosition='bottom' renderTabBar={() => <DefaultTabBar />} onChangeTab={() => {}}>
          <View tabLabel='Tab #1' style={{flex:1}}>
            <ListView 
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
            />
          </View>
          <View tabLabel='Tab #2' style={{flex:1}}><Text>fuck</Text></View>
          <View tabLabel='Tab #3' style={{flex:1}}>
            <TouchableOpacity onPress={this._pressLogin.bind(this)}>
              <Text>登陆</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pressRegist.bind(this)}>
              <Text>注册</Text>
            </TouchableOpacity>
          </View>
        </ScrollableTabView>
      )
  }
};
class MovieView extends Component {
  render(){
    return (
      <View>
        <Text>Movie View</Text>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
  }
  _pressSubmit() {
    if(this.state.name && this.state.password) {
      fetch('https://mywebsite.com/endpoint/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
        })
      }).then((response) => {
        Alert.alert(
          '响应结果',
          '成功'
          )
        console.log(response);
      }).catch((error) => {
        Alert.alert(
          '响应结果',
          '错误'
          )
        console.log(error);
      })
    }else{
      Alert.alert(
      '来自星星的提示',
      '你TM忘记输入账号或密码了'
      )
    }
  }
  render() {
    return (
      <View>
        <Text>账号：</Text>
        <TextInput placeholder='输入账号别bb' onChangeText={(val) => this.setState({name: val})} />
        <Text>密码：</Text>
        <TextInput secureTextEntry={true} placeholder='输入密码啦笨蛋' onChangeText={(val) => this.setState({password: val})} />
        <TouchableOpacity onPress={this._pressSubmit.bind(this)}>
          <Text style={{fontSize: 30}}>登陆</Text>
        </TouchableOpacity>
      </View>
      )
  }
}
class RegistView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
  }
  _pressRegist() {
    if(this.state.name && this.state.password) {
      fetch('https://mywebsite.com/endpoint/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
        })
      }).then((response) => {
        Alert.alert(
          '响应结果',
          '成功'
          )
        console.log(response);
      }).catch((error) => {
        Alert.alert(
          '响应结果',
          '错误'
          )
        console.log(error);
      })
    }else{
      Alert.alert(
      '来自星星的提示',
      '你TM忘记输入账号或密码了'
      )
    }
  }
  render() {
    return (
      <View>
        <Text>账号：</Text>
        <TextInput placeholder='输入账号别bb' onChangeText={(val) => this.setState({name: val})} />
        <Text>密码：</Text>
        <TextInput secureTextEntry={true} placeholder='输入密码啦笨蛋' onChangeText={(val) => this.setState({password: val})} />
        <TouchableOpacity onPress={this._pressRegist.bind(this)}>
          <Text style={{fontSize: 30}}>注册</Text>
        </TouchableOpacity>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  flexContain: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  containBody: {
    flex: 9,
    backgroundColor: '#009A61',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  footerItem: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderWidth: 1,
    borderRightWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ftext: {
    color: '#000',
    fontSize: 20,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 50,
    height: 50,
  },
})

AppRegistry.registerComponent('reactApp', () => HelloWorldApp);