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
        console.log(request);
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

    generateToken = async () => {
     
      const staticData = await fetch(`${Config.api}/hash-request`, {
        //cache: 'force-cache',
        headers: {
          "x-api-key": Config.app_key,
          "agent": 'User Agent Data'
        }
      });
    
      return staticData;
    };

    formatDate = (dateString) => {

        const date = new Date(dateString);


        // Format the date components separately
        const day = date.getDate();
        const month = date.toLocaleString('en-GB', { month: 'long' });
        const year = date.getFullYear();

        // Combine them with a comma
        const formattedDate = `${day} ${month}, ${year}`;
        
        return formattedDate;

    }

    decodeHtmlEntities(text) {
      return text;
      // return he.decode(text);  
    }

}

var Helper = new HelperData();

export {Helper, HelperData}; 