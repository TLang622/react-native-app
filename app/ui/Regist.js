import React from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    ToolbarAndroid,
    Text
} from 'react-native';
import EditView from '../lib/EditView';
import RegButton from '../lib/RegButton';
import NetUitl from '../lib/NetUtil';

export default class Regist extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }
    //回到第一个页面去
    onJump(){
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render(){
        return (
            <View >
                <View>
                    <EditView  name='输入手机号' onChangeText={(text) => {
                        this.userName = text;
                    }}/>
                    <EditView  name='输入email' onChangeText={(text) => {
                        this.email = text;
                    }}/>
                    <EditView name='输入密码' onChangeText={(text) => {
                        this.password = text;
                    }}/>
                    <RegButton name='注册' onPressCallback={this.onPressCallback.bind(this)}/>
                </View>
                <TouchableOpacity onPress = {this.onJump.bind(this)}>
                    <Text>已经有账户</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onPressCallback() {
        let formData = {};
        formData.username = this.userName;
        formData.email = this.email;
        formData.password = this.password;
        let url = "http://api.smseec.org:8080/create_auth/";
        NetUitl.postJson(url,formData,(responseText) => {
              console.log(responseText);
              if(responseText.status){
                alert('注册成功');
                this.onJump();
              }else if(responseText.username) {
                alert(responseText.username);
              }else if(responseText.email){
                alert(responseText.email);
              }else{
                alert('注册失败');
            }
        })
  };

}