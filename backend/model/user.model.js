const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{type: String,required: true},
    password: {type: String,required: true},
    email: {type: String,required: true},
    Address: {type: String,required: false},
    Institution: {type: String,required: false},
    First_name: {type: String,required: false},
    Last_name: {type: String,required: false},
    DOB: {type: Date,required: false},
    profilepic: {type: String, required: false}
});

module.exports=mongoose.model('User',userSchema);


