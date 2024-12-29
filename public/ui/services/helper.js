import Config from "./config.js";
class HelperData {
    
    user_cookie = 'user_info';
    jwt_secret = "flatcoding_t1y4u5236985471zasde!gfh@qwe#$%hoj^ytu&*tu(ib)ib~gfhrytuibonphojlkmlbkxzasqwe";
    
    formatNumber = function (number) {
      if (number < 1000) return number.toString(); // No abbreviation needed
    
      const units = ['k', 'm', 'b', 't']; // Thousand, Million, Billion, Trillion
      let unitIndex = -1; // Start with no unit
      let formattedNumber = number;
    
      while (Math.abs(formattedNumber) >= 1000 && unitIndex < units.length - 1) {
        formattedNumber /= 1000; // Divide by 1000
        unitIndex++;
      }
    
      // Format the number to one decimal place and add the corresponding unit
      return `${formattedNumber.toFixed(1)}${units[unitIndex]}`;
    }

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

    validateEmail(email){
      // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       var re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(email);
   }
   

    generateCaptcha = () => {

      // make it with 6 charachters 
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
      return Array.from({ length: 6 }, () => { 
        var generate = Math.floor(Math.random() * chars.length);
         
        return chars.charAt(generate)
      }).join(' ');
  
    }

}

var Helper = new HelperData();

export {Helper, HelperData}; 