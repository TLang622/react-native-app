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
    ScrollView
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

export default class Index extends Component {
    constructor(props){
      super(props);
      this.state = {
        questionsData: [],
        questionMark: [],
        loaded1: false,
        loaded2: false,
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        settingSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(settingData)
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
            });
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
            data: this.state.questionsData[2]
          }
        });
      }
    }

    onFormalTest() {
      const { navigator } = this.props;
      if (navigator) {
        navigator.push({
          name : 'Tab3',
          component : Tab3,
        });
      }
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
                <Text>深秋的夜晚，多的是一些凄冷，也曾于薄凉的夜风中，感受那段炙热的情感，还有在岁月中走过留下的旖旎风光。也曾把无数的相思寄语夜空的明月，回首间，少去一份心酸，多一份幸福与安然便好。也曾将深深的牵挂，寄语划过夜幕的流星，只要能在有你的地点漂落，哪怕一瞬也好，可这美好的愿景，终经不起光阴的考验。心冷了，一切也就跟着寂灭了。心字成灰，情随缘灭，一生颠沛流离，只是为了幸福，寻找心灵可以栖息的港湾。梦落潇湘，只是为了幸福，寻找生命最后的归宿。也只愿花落时，不会再是曲终人散的结局。也只愿易逝的流光里，不会再有曲终人散的伤感。相遇有梦，只是这曲曲折折的故事中，幸福的导演着开始，一路走来，却发现彼此心与心的距离越来越远，于是，浪漫的童话里，你成了主角，我却变成了配角。关于那段相遇的记忆，或许现在的你已将与我有关的故事，剔除的干干净净。思念就像歌里的一样，是一种很悬的东西，让人琢磨不定，对朋友的思念只是希望看到他过的好不好，想跟他说说自己的心里话，想跟他玩一玩、聚一聚。爱意的思念是很奇妙的，想要知道他的一切，有时候会想到他有没有在安静的时候想起你来，想拥抱他，给他幸福，想与他以前相处的一点一滴，情不自禁的脸上有笑有泪，这是思念一个最爱的人的最美妙的时候，不论你做什么事情都会想到他，尤其是做和他在一起做过的事情，你可能就会停在那里慢慢被回忆占据。也会在清晨醒刚睡醒的时候就莫名的失神，因为你还没有从梦中醒过来，还没有习惯没有他在你身边的生活。而亲人间的思念又是另一番模样，那是带着浓浓的暖意的哀愁。思念就像歌里的一样，是一种很悬的东西，让人琢磨不定，对朋友的思念只是希望看到他过的好不好，想跟他说说自己的心里话，想跟他玩一玩、聚一聚。爱意的思念是很奇妙的，想要知道他的一切，有时候会想到他有没有在安静的时候想起你来，想拥抱他，给他幸福，想与他以前相处的一点一滴，情不自禁的脸上有笑有泪，这是思念一个最爱的人的最美妙的时候，不论你做什么事情都会想到他，尤其是做和他在一起做过的事情，你可能就会停在那里慢慢被回忆占据。也会在清晨醒刚睡醒的时候就莫名的失神，因为你还没有从梦中醒过来，还没有习惯没有他在你身边的生活。而亲人间的思念又是另一番模样，那是带着浓浓的暖意的哀愁。思念就像歌里的一样，是一种很悬的东西，让人琢磨不定，对朋友的思念只是希望看到他过的好不好，想跟他说说自己的心里话，想跟他玩一玩、聚一聚。爱意的思念是很奇妙的，想要知道他的一切，有时候会想到他有没有在安静的时候想起你来，想拥抱他，给他幸福，想与他以前相处的一点一滴，情不自禁的脸上有笑有泪，这是思念一个最爱的人的最美妙的时候，不论你做什么事情都会想到他，尤其是做和他在一起做过的事情，你可能就会停在那里慢慢被回忆占据。也会在清晨醒刚睡醒的时候就莫名的失神，因为你还没有从梦中醒过来，还没有习惯没有他在你身边的生活。而亲人间的思念又是另一番模样，那是带着浓浓的暖意的哀愁。思念就像歌里的一样，是一种很悬的东西，让人琢磨不定，对朋友的思念只是希望看到他过的好不好，想跟他说说自己的心里话，想跟他玩一玩、聚一聚。爱意的思念是很奇妙的，想要知道他的一切，有时候会想到他有没有在安静的时候想起你来，想拥抱他，给他幸福，想与他以前相处的一点一滴，情不自禁的脸上有笑有泪，这是思念一个最爱的人的最美妙的时候，不论你做什么事情都会想到他，尤其是做和他在一起做过的事情，你可能就会停在那里慢慢被回忆占据。也会在清晨醒刚睡醒的时候就莫名的失神，因为你还没有从梦中醒过来，还没有习惯没有他在你身边的生活。而亲人间的思念又是另一番模样，那是带着浓浓的暖意的哀愁。思念就像歌里的一样，是一种很悬的东西，让人琢磨不定，对朋友的思念只是希望看到他过的好不好，想跟他说说自己的心里话，想跟他玩一玩、聚一聚。爱意的思念是很奇妙的，想要知道他的一切，有时候会想到他有没有在安静的时候想起你来，想拥抱他，给他幸福，想与他以前相处的一点一滴，情不自禁的脸上有笑有泪，这是思念一个最爱的人的最美妙的时候，不论你做什么事情都会想到他，尤其是做和他在一起做过的事情，你可能就会停在那里慢慢被回忆占据。也会在清晨醒刚睡醒的时候就莫名的失神，因为你还没有从梦中醒过来，还没有习惯没有他在你身边的生活。而亲人间的思念又是另一番模样，那是带着浓浓的暖意的哀愁。思念就像歌里的一样，是一种很悬的东西，让人琢磨不定，对朋友的思念只是希望看到他过的好不好，想跟他说说自己的心里话，想跟他玩一玩、聚一聚。爱意的思念是很奇妙的，想要知道他的一切，有时候会想到他有没有在安静的时候想起你来，想拥抱他，给他幸福，想与他以前相处的一点一滴，情不自禁的脸上有笑有泪，这是思念一个最爱的人的最美妙的时候，不论你做什么事情都会想到他，尤其是做和他在一起做过的事情，你可能就会停在那里慢慢被回忆占据。也会在清晨醒刚睡醒的时候就莫名的失神，因为你还没有从梦中醒过来，还没有习惯没有他在你身边的生活。而亲人间的思念又是另一番模样，那是带着浓浓的暖意的哀愁。思念就像歌里的一样，是一种很悬的东西，让人琢磨不定，对朋友的思念只是希望看到他过的好不好，想跟他说说自己的心里话，想跟他玩一玩、聚一聚。爱意的思念是很奇妙的，想要知道他的一切，有时候会想到他有没有在安静的时候想起你来，想拥抱他，给他幸福，想与他以前相处的一点一滴，情不自禁的脸上有笑有泪，这是思念一个最爱的人的最美妙的时候，不论你做什么事情都会想到他，尤其是做和他在一起做过的事情，你可能就会停在那里慢慢被回忆占据。也会在清晨醒刚睡醒的时候就莫名的失神，因为你还没有从梦中醒过来，还没有习惯没有他在你身边的生活。而亲人间的思念又是另一番模样，那是带着浓浓的暖意的哀愁。</Text>
                <TouchableOpacity onPressOut={this.onFormalTest.bind(this)}>
                  <Text>同意</Text>
                </TouchableOpacity>
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