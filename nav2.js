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
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8','row 9','row 10','row 11','row 12','row 13','row 14','row 15'
      ])
    };
  }
  _renderRow(rowData, sectionID, rowID) {
    var imgSource = THUMB_URLS[rowID];
    return (
      <TouchableOpacity>
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
  }
  render() {
    return (
        <ScrollableTabView tabBarPosition='bottom' renderTabBar={() => <DefaultTabBar />}>
          <View tabLabel='Tab #1' style={{flex:1}}>
            <ListView 
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
            />
          </View>
          <View tabLabel='Tab #2' style={{flex:1}}><Text>fuck</Text></View>
          <View tabLabel='Tab #3' style={{flex:1}}><Text>you</Text></View>
        </ScrollableTabView>
      );
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