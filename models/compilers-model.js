const { mongoose } = require("./../config/connection");
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema 
const Schema = mongoose.Schema;

let compilersSchema = new Schema({

    title: { 
        type: String,
        trim: true,
        required: true
    },
    meta_title: { 
        type: String,
        trim: true,
        required: true
    },
    meta_description : { 
        type: String,
        trim: true,
        required: true
    },
    description: { 
        type: String,
        trim: true,
        required: true
    }, 
    slug: { 
        type: String,
        trim: true,
        required: true
    },
    thumbnail_url: { 
        type: String,
        trim: true,
        required: true
    },
    language: { 
        type: String,
        trim: true,
        required: true
    },
    keyphrase: { 
        type: String,
        trim: true,
        required: true
    },
    allow_search_engine: { 
        type: Boolean,
        default: false
    },
    canonical: { 
        type: String,
        trim: true,
        required: true
    },
    prevent_codes: { 
        type: [String],
        trim: true,
        required: true
    },
    created_at: { 
        type: Date,
        default: Date.now
    }    
});

// Apply the pagination plugin to the schema
compilersSchema.plugin(mongoosePaginate);

// Create Collection
var Compiler = mongoose.model("compiler", compilersSchema);

module.exports = { Compiler };
