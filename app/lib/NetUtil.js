import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
let NetUtil = {
  postJson(url, data, callback){
        var fetchOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data)
        };

        fetch(url, fetchOptions)
        .then((response) => response.json())
        .then((responseText) => {
         //  callback(JSON.parse(responseText));
           callback(responseText);
        }).done();
  },
  getJson(url, callback){
        storage.load({
            key: 'loginState',
        }).then(ret => {
          var authorization = 'JWT ' + ret.token;
          var fetchOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': authorization
            },
          };
          fetch(url, fetchOptions)
          .then((response) => response.json())
          .then((responseText) => {
            //callback(JSON.parse(responseText));
            callback(responseText);
          }).done();
            //如果找到数据，则在then方法中返回
        }).catch(err => {
            //如果没有找到数据且没有同步方法，或者有其他异常，则在catch中返回
          
        });
  },
}
export default NetUtil;