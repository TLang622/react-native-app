import React, { Component } from 'react';
import Storage from 'react-native-storage';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import EditView from '../lib/EditView';
import LoginButton from '../lib/LoginButton';
import Index from '../ui/Index';
import Regist from '../ui/Regist';
import NetUitl from '../lib/NetUtil';

global.storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {

    }
  });

export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
  }

  render() {
      return (
      <View style={LoginStyles.loginview}>
          <View  style={{flexDirection: 'row',height:100,marginTop:1,
            justifyContent: 'center',
            alignItems: 'flex-start',}}>
            <Image source={require('../image/login.png')}/>
          </View>
          <View style={{marginTop:80}}>
            <EditView  name='输入用户名/注册手机号' onChangeText={(text) => {
                this.userName = text;
            }}/>
            <EditView name='输入密码' onChangeText={(text) => {
                this.password = text;
            }}/>
            <LoginButton name='登录' onPressCallback={this.onPressCallback.bind(this)}/>
            <TouchableOpacity onPress={this.onRegCallback.bind(this)} style={RegStyles.regTextView}>
              <Text style={RegStyles.regText} >
                  注册
              </Text>
            </TouchableOpacity>
            <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} >忘记密码？</Text>
          </View>
     </View>
   )
  }


  onPressCallback() {
    let formData = {};
    formData.username = this.userName;
    formData.password = this.password;
    let url = "http://api.smseec.org:8080/api-token-auth/";
    NetUitl.postJson(url,formData,(responseText) => {
          console.log(responseText);
          if(responseText.token){
            storage.save({
              key: 'loginState',  //注意:请不要在key中使用_下划线符号!
              rawData: { 
                token: responseText.token
              },    
              expires: null
            });
            this.onLoginSuccess();
          }else{
            alert('登陆失败');
          }
    })
  };

  //跳转到第二个页面去
  onLoginSuccess(){
   const { navigator } = this.props;
   if (navigator) {
     navigator.push({
       name : 'Index',
       component : Index,
     });
    }
  }

 onRegCallback(){
    const { navigator } = this.props;
    console.log(navigator)
    if (navigator) {
      navigator.push({
        name : 'Regist',
        component : Regist,
      });
    }
   }

}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
      backgroundColor: '#ffffff',
  },
});

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