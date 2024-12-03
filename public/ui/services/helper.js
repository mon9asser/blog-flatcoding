import Config from "./config.js";
class HelperData {
    
    user_cookie = 'user_info';
    jwt_secret = "flatcoding_t1y4u5236985471zasde!gfh@qwe#$%hoj^ytu&*tu(ib)ib~gfhrytuibonphojlkmlbkxzasqwe";
    
    // => send reques
    sendRequest = async ({api, method, data, headers }) => {

        if( headers === undefined ) {
            headers = {};
        }
        
        
        var token = '';
    
        // generate token 
        var request = await this.generateToken();
        
        if( request.status == 200 ) {
          var response = await request.json();
          if( ! response.is_error ) {
            token = response.data;
          }
        } 
        
        headers["x-api-key"] = Config.app_key 
        headers["authorization"] = token;
        headers["Content-Type"] = "application/json";
    
        var requestObject = { 
         // cache: 'force-cache',
          headers,
          method 
        }
    
        if( method.toLowerCase() == 'post') { 
          requestObject.body = JSON.stringify(data); 
        }
    
        
        var url = `${Config.api}/${api}`;
        
        var response = await fetch(`${url}`, requestObject ); 
         
        return response;
    }


}

var Helper = new HelperData();

export {Helper, HelperData}; 