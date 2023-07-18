let mongoose = require('mongoose');

//Create Model of Contact
let contactModel = mongoose.Schema(
    {
        "firstname" : String,
        "lastname" : String,
        "contact" : Number,
        "email" : String,
        "message" : String
    },
    {
        collection: "contacts"
    }
);

module.exports = mongoose.model('Contact', contactModel);

