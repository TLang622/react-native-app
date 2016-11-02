import React, { Component } from 'react';
import Storage from 'react-native-storage';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {
    View,
    Navigator,
    TouchableOpacity,
    ToolbarAndroid,
    Text,
    AsyncStorage,
    ListView,
    StyleSheet,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import Main from '../ui/Main';
import Tab1 from '../ui/Tab1';
import Tab2 from '../ui/Tab2';
import Tab3 from '../ui/Tab3';
import SettingView1 from '../ui/SettingView1';
import SettingView2 from '../ui/SettingView2';
import SettingView3 from '../ui/SettingView3';
import SettingView4 from '../ui/SettingView4';
import SettingView5 from '../ui/SettingView5';
import SettingView6 from '../ui/SettingView6';
import practiceData from '../practice';
import settingData from '../setting';
import NetUitl from '../lib/NetUtil';
import TestNotice from '../lib/TestNotice';

export default class Index extends Component {
    constructor(props){
      super(props);
      this.state = {
        questionsData: [],
        questionMark: [],
        loaded1: false,
        loaded2: false,
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        settingSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(settingData),
        notices: [],
        invitationShow: 1,
      };
    }

    componentDidMount() {
        // storage.remove({
        //     key: 'questions'
        // });
        storage.load({
            key: 'loginState',
        }).then(ret => {
            console.log(ret)
            //如果找到数据，则在then方法中返回
        }).catch(err => {
            //如果没有找到数据且没有同步方法，或者有其他异常，则在catch中返回
            console.log(err);
            switch (err.name) {
                case 'NotFoundError':
                    const { navigator } = this.props;
                    if (navigator) {
                      navigator.push({
                        name : 'Main',
                        component : Main,
                      });
                    }
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });

        storage.load({
            key: 'category',
        }).then(ret => {
            console.log(ret)
            this.setState({
              loaded1: true,
              dataSource: this.state.dataSource.cloneWithRows(ret)
            });
            //做题记录
            var _this = this;
            var questionMark = [];
            ret.map(function(value, index) {
              questionMark[index] = 0;
              storage.load({
                key: 'questionsMark' + value.id,
              }).then(result => {
                questionMark[index] = result;
                _this.setState({
                  questionMark: questionMark
                });
              }).catch(err => {
                //console.log(err.message);
              });
            });
        }).catch(err => {
            //如果没有找到数据且没有同步方法，或者有其他异常，则在catch中返回
            console.log(err);
            NetUitl.getJson('http://api.smseec.org:8080/category/',(response) => {
              if(response) {
                this.setState({
                  loaded1: true,
                  dataSource: this.state.dataSource.cloneWithRows(response)
                });
              }
              storage.save({
                key: 'category',
                rawData: response
              });
            });
        });

        storage.load({
            key: 'questions',
        }).then(ret => {
            console.log(ret)
            this.setState({
              questionsData: ret,
              loaded2: true,
            });
            //如果找到数据，则在then方法中返回
        }).catch(err => {
            //如果没有找到数据且没有同步方法，或者有其他异常，则在catch中返回
            console.log(err);
            NetUitl.getJson('http://api.smseec.org:8080/questions/?page_size=5000',(response) => {
              if(!response.results) { return; }
              var responseDeal = [];
              for(var i=0; i<response.results.length; i++) {
                responseDeal[i] = [];
              }
              for(var i=0; i<response.results.length; i++) {
                responseDeal[response.results[i].category - 1].push(response.results[i]);
              }
              this.setState({
                questionsData: responseDeal,
                loaded2: true,
              });
              storage.save({
                key: 'questions',
                rawData: responseDeal
              });
              storage.save({
                key: 'questionsUntreated',
                rawData: response.results
              });
            });
        });   

      NetUitl.getJson('http://api.smseec.org:8080/notice/',(response) => {
        console.log(response)
        this.setState({
          notices: response
        })
      });

    }

    onTest() {
      const { navigator } = this.props;
      if (navigator) {
        navigator.push({
          name : 'Tab2',
          component : Tab2,
          params: {
            name: '模拟考试',
            data: this.state.questionsData[2],
            time: 2700
          }
        });
      }
    }

    onFormalTest() {
      var invitation = this.invitation;
      NetUitl.getJson('http://api.smseec.org:8080/v2/exam/?invitation=' + invitation + '&client=cellphone',(response) => {
        //console.log(response);
        this.formalTestData = response;
        this.setState({
          invitationShow: 3
        });
      });
    }
    onInvitation() {
      this.setState({
        invitationShow: 2
      });
    }

    renderLoadingView() {
      return (
        <View>
             <Text>Loading.....</Text>
        </View>
      );
    };

    onPractice(id, name) {
      console.log(id, name)
      const { navigator } = this.props;
      if (navigator && this.state.questionsData[id - 1].length > 0) {
        navigator.push({
          name : 'Tab1',
          component : Tab1,
          params: {
            name: name,
            data: this.state.questionsData[id - 1]
          }
        });
      }else{
        alert('数据获取失败')
      }
    }

    onSetting(id) {
      var myName, myComponent;
      switch(id) {
        case '1':
          myName = 'SettingView1';
          myComponent = SettingView1;
          break;
        case '2':
          myName = 'SettingView2';
          myComponent = SettingView2;
          break;
        case '3':
          myName = 'SettingView3';
          myComponent = SettingView3;
          break;
        case '4':
          myName = 'SettingView4';
          myComponent = SettingView4;
          break;
        case '5':
          myName = 'SettingView5';
          myComponent = SettingView5;
          break;
        case '6':
          myName = 'SettingView6';
          myComponent = SettingView6;
          break;
      }
      const { navigator } = this.props;
      if (navigator) {
        navigator.push({
          name : myName,
          component : myComponent,
        });
      }
    }

    renderRow(rowData) {
      return (
        <TouchableOpacity onPress={this.onPractice.bind(this,rowData.id,rowData.name)}>
          <View style={ListStyle.listRow}>
            <Image source={require('../image/icon.png')} />
            <Text>{rowData.name}</Text>
            <Text>{this.state.questionMark[rowData.id - 1]}</Text>
            <Image source={require('../image/icon.png')} />
          </View>
        </TouchableOpacity>
        )
    }

    settingRow(rowData) {
      return (
        <TouchableOpacity onPress={() => {this.onSetting(rowData.id)}}>
          <View style={ListStyle.listRow}>
            <Image source={require('../image/icon.png')} />
            <Text>{rowData.text}</Text>
          </View>
        </TouchableOpacity>
        )
    }
    testNotice() {
      if(this.state.invitationShow == 1) {
        return(
          <View>
            <Text>{this.state.notices[0].title}</Text>
            <Text>{this.state.notices[0].content}</Text>
            <TouchableOpacity onPressOut={this.onInvitation.bind(this)}>
              <Text>同意</Text>
            </TouchableOpacity>
          </View>
          )
      }else if(this.state.invitationShow == 2) {
        return(
          <View>
            <Text>在下方输入邀请码</Text>
            <TextInput onChangeText={(text)=>{this.invitation = text}} />
            <TouchableOpacity onPress={this.onFormalTest.bind(this)}>
               <Text>验证</Text>
            </TouchableOpacity>
          </View>
          )
      }
      else if(this.state.invitationShow == 3) {
        return(
          <TestNotice data={this.formalTestData} nav={this.props} name='正式考试' />
          )
      }
    }

    render(){
        if (!this.state.loaded1 || !this.state.loaded2) {
          return this.renderLoadingView();
        }
        return (
            <ScrollableTabView tabBarPosition='bottom' renderTabBar={() => <DefaultTabBar />}>
              <ListView
                tabLabel='刷题'
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
              <View tabLabel='模拟考试'>
                <TouchableOpacity onPress={this.onTest.bind(this)}>
                  <Text>点击开考</Text>
                </TouchableOpacity>
              </View>
              <ScrollView tabLabel='正式考试'>
                { this.testNotice() }
              </ScrollView>
              <ListView
                tabLabel='我的'
                dataSource={this.state.settingSource}
                renderRow={this.settingRow.bind(this)}
              />
            </ScrollableTabView>
        );
    }
}

const ListStyle = StyleSheet.create({
  listRow: {
    flex: 1,
    flexDirection: 'row',
    height: 50
  },
});