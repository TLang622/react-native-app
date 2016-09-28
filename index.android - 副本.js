import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
} from 'react-native';
const ORDER_STATUS_DATA={
      "api":"GetSearchHistory",
    "v":"1.0",
    "code":"0",
    "msg":"success",
    "data":[{
        "id":0,
        "status":"订单已提交",
        "remark":"请耐心等待商家确认",
        "time":"8月5日 18:13"
    },{
        "id":1,
        "status":"支付成功",
        "remark":"",
        "time":"8月5日 18:15"
    },{
        "id":2,
        "status":"商家已接单",
        "remark":"商品准备中,由商家配送,配送进度请咨询商家",
        "time":"8月5日 18:20"
    },{
         "id":3,
        "status":"配送进行中",
        "remark":"你的商品正由XX配送员火速送达中...",
        "time":"8月5日 18:25"
    },{
         "id":4,
        "status":"订单完成",
        "remark":"任何意见和吐槽,都欢迎联系我们",
        "time":"8月5日 18:34"
    }]
};
var STATUS_IMGS=[
     require('./imgs/ic_order_status_tijiao.png'),  
     require('./imgs/ic_order_status_zhifu.png'),  
     require('./imgs/ic_order_status_jiedan.png'),  
     require('./imgs/ic_order_status_peisong.png'),
     require('./imgs/ic_order_status_wancheng.png')
];
var {height, width} = Dimensions.get('window');
var orderStatuts = ORDER_STATUS_DATA.data;
var HEADER_STATUS = orderStatuts[0];
var FOOTER_STATUS = orderStatuts[orderStatuts.length-1];
var CENTER_STATUS = orderStatuts.slice(1,orderStatuts.length-1);
class TimeLineDemo extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this); 
    this.renderHeaderItem = this.renderHeaderItem.bind(this); 
    this.renderFooterItem = this.renderFooterItem.bind(this); 
    this.state={
         dataSource: new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2,
         }),
 
      }
  } 
  //进行渲染数据
  renderContent(dataSource) {
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={{flex:1}}
        onEndReachedThreshold={10}
        enableEmptySections={true}
        renderHeader={this.renderHeaderItem}
        renderFooter={this.renderFooterItem}
      />
    );
   }
  //渲染每一项的数据
  renderItem(data) {
     if(data.id > 0 && data.id < 4 ){
       return (this.renderCenterItem(data));
     }
  } 
  renderHeaderItem(){
    return (
      <View style={{flexDirection:'row',height:75}}>
          <View>
              <Image source={require('./imgs/ic_order_status_tijiao.png')} 
                     style={{width:30,height:30,marginLeft:10,marginTop:22}}/>
              <Image source={require('./imgs/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
          </View>
          <View >
              <View style={{height:5}}/>
              <Image source={require('./imgs/ic_order_status_item_bg.png')} 
                     style={{height:65,marginLeft:10,width:(width-60)}}>
                      {this.renderCenterContent(HEADER_STATUS)}
              </Image>
              <View style={{height:5}}/>
          </View>
      </View>
    );
  }
  renderCenterItem(data){
    return (
      <View style={{flexDirection:'row',height:75}}>
          <View>
              <Image source={require('./imgs/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
              <Image source={STATUS_IMGS[data.id]} style={{width:30,height:30,marginLeft:10}}/>
              <Image source={require('./imgs/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
          </View>
          <View >
              <View style={{height:5}}/>
              <Image source={require('./imgs/ic_order_status_item_bg.png')} 
                     style={{height:65,marginLeft:10,width:(width-60)}}>
                      {this.renderCenterContent(data)}
              </Image>
              <View style={{height:5}}/>
          </View>
      </View>
    );
  }
  renderFooterItem(){
    return (
      <View style={{flexDirection:'row',height:75}}>
          <View>
              <Image source={require('./imgs/ic_order_shu.png')} style={{height:20,marginLeft:25}}/>
              <Image source={require('./imgs/ic_order_status_wancheng.png')} style={{width:30,height:30,marginLeft:10}}/>
          </View>
          <View >
              <View style={{height:5}}/>
              <Image source={require('./imgs/ic_order_status_item_bg.png')} 
                     style={{height:65,marginLeft:10,width:(width-60)}}>
                     {this.renderCenterContent(FOOTER_STATUS)}
              </Image>
              <View style={{height:5}}/>
          </View>
      </View>
    );
  }
  renderCenterContent(data){
    return (
       <View style={{marginLeft:15,marginTop:10}}>
              <View style={{flexDirection:'row'}}>
                      <Text style={{color:'black',fontSize:14,backgroundColor:'#00000000'}}>{data.status}</Text>
                      <View style={{flex:1,alignItems:'flex-end',marginRight:10}}><Text style={{color:'#777',fontSize:12,backgroundColor:'#00000000'}}>{data.time}</Text></View>
                      </View>
                      <Text style={{color:'#777',fontSize:12,marginTop:10,backgroundColor:'#00000000'}}>{data.remark}</Text>
      </View>
    );
  }
  render() {
    return (
        <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
              {this.renderContent(this.state.dataSource.cloneWithRows(
                         CENTER_STATUS === undefined ? [] : CENTER_STATUS))}
        </View>
    );
  }
}
AppRegistry.registerComponent('reactApp', () => TimeLineDemo);