const { mongoose } = require("./../config/connection");

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let storiesSchema = new Schema({

    title:  {
        type: String,
        trim: true,
        default: ''
    },
    description:  {
        type: String,
        trim: true,
        default: ''
    },
    meta_description:  {
        type: String,
        trim: true,
        default: ''
    },
    is_published:  {
        type: Boolean, 
        default: false
    },
    enable_search_engine: {
        type: Boolean, 
        default: false
    }, 
    enable_besside_title: {
        type: Boolean, 
        default: false
    },
    canonical:  {
        type: String,
        trim: true,
        default: ''
    },
    image_cover:  {
        type: String,
        trim: true,
        default: ''
    },
    meta_title:  {
        type: String,
        trim: true,
        default: ''
    },
    screens: [],
    date_updated: {
        type: Date,
        default: Date.now,
    } 
    
});

// Create Collection
var WebStories = mongoose.model("stories", storiesSchema);

module.exports = { WebStories };
