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
    StyleSheet
} from 'react-native';
import Main from '../ui/Main';
import Tab1 from '../ui/Tab1';
import Tab2 from '../ui/Tab2';
import practice from '../practice';

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        loaded: false
      };
    }

    componentDidMount() {
        // storage.remove({
        //     key: 'loginState'
        // });
        storage.load({
            key: 'loginState',
        }).then(ret2 => {
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

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(practice),
          loaded: true,
        });
    }

    onTest() {
      const { navigator } = this.props;
      if (navigator) {
        navigator.push({
          name : 'Tab2',
          component : Tab2,
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

    onPractice() {
      const { navigator } = this.props;
      if (navigator) {
        navigator.push({
          name : 'Tab1',
          component : Tab1,
        });
      }
    }

    renderRow(rowData) {
      return (
        <TouchableOpacity onPress={this.onPractice.bind(this)}>
          <View style={ListStyle.listRow}>
            <Text>{rowData.icon}</Text>
            <Text>{rowData.name}</Text>
            <Text>{rowData.star}</Text>
            <Text>{rowData.practice}</Text>
          </View>
        </TouchableOpacity>
        )
    }

    render(){
        if (!this.state.loaded) {
          return this.renderLoadingView();
        }
        return (
            <ScrollableTabView tabBarPosition='bottom' renderTabBar={() => <DefaultTabBar />}>
              <View tabLabel='刷题'>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                />
              </View>
              <View tabLabel='模拟考试'>
                <TouchableOpacity onPress={this.onTest.bind(this)}>
                  <Text>点击考试</Text>
                </TouchableOpacity>
              </View>
              <View tabLabel='正式考试'><Text>fuck</Text></View>
              <View tabLabel='我的'><Text>fuck</Text></View>
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