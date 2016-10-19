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
}
export default NetUtil;