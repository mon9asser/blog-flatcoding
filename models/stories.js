const { mongoose } = require("./../config/connection");

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let storiesSchema = new Schema({

    screens: [
        {
            screen_object: {
                type: String,
                trim: true,
                default: ''
            },
            template_name:  {
                type: String,
                trim: true,
                default: ''
            },
            data: {},
            options: {}
        }
    ],
    meta: {
        description: {
            type: String,
            trim: true,
            default: ''
        },
        title:  {
            type: String,
            trim: true,
            default: ''
        },
        image_cover:  {
            type: String,
            trim: true,
            default: ''
        },
    },
    amp_story_props: {},
    date_updated: {
        type: Date,
        default: Date.now,
    },
    date_published: {
        type: Date,
        default: Date.now,
    },
 
});

// Create Collection
var WebStories = mongoose.model("stories", storiesSchema);

module.exports = { WebStories };
