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
} from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id:'main'}}
        renderScene={this.renderNav}
      />
    );
  };
  renderNav(route, nav){
    switch(route.id) {
      case 'main':
        return <MainScreen navigator={nav} title='Main' />;
      case 'tab1':
        return <FirstScreen navigator={nav} title='tab1' />;
      case 'tab2':
        return <SecendScreen navigator={nav} title='tab2' />;
    }
  }
}

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.flexContain}>
        <View style={styles.containBody}>
          <Text>首页</Text>
        </View>
        <FooterNav navigator={this.props.navigator}/>
      </View>
      )
  }
};

class FirstScreen extends Component{
  render() {
    return (
      <View style={styles.flexContain}>
        <View style={styles.containBody}>
          <Text>tab1</Text>
        </View>
        <FooterNav navigator={this.props.navigator}/>
      </View>
      )
  }
}

class SecendScreen extends Component{
  render() {
    return (
      <View style={styles.flexContain}>
        <View style={styles.containBody}>
          <Text>tab2</Text>
        </View>
        <FooterNav navigator={this.props.navigator}/>
      </View>
      )
  }
}

class FooterNav extends Component{
  toMain() {
    this.props.navigator.push({id: 'main'});
  }
  toTab1() {
    this.props.navigator.push({id: 'tab1'});
  }
  toTab2() {
    this.props.navigator.push({id: 'tab2'});
  }
  render() {
    return (
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <TouchableHighlight onPress={this.toMain.bind(this)}>
            <Text style={styles.ftext}>main</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.footerItem}>
          <TouchableHighlight onPress={this.toTab1.bind(this)}>
            <Text style={styles.ftext}>tab1</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.footerItem}>
          <TouchableHighlight onPress={this.toTab2.bind(this)}>
            <Text style={styles.ftext}>tab2</Text>
          </TouchableHighlight>
        </View>
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
    
  }
})

AppRegistry.registerComponent('reactApp', () => HelloWorldApp);