const {mongoose} = require("./../config/connection");


// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let usersSchema = new Schema({
    id: {
          type: mongoose.Schema.Types.ObjectId,
          // default: mongoose.Types.ObjectId
    },
    
    user_id: {
        type : String ,
        trim: true,
        default: ""  
    },

    

});




// Create Collection
var UsrApps = mongoose.model("user_apps" , usersSchema );



module.exports = {UsrApps};