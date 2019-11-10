const mongoose= require('mongoose');

const collegeSchema= mongoose.Schema({
    Name:{type: String, required: true},
    address:{type: String, required: true},
    email:{type: String, required: true},
    phoneNo:{type: String, required: true},
    rating:{type: Number, required: true},
    password:{type: Number, required: true}
});

module.exports=mongoose.model('College',collegeSchema);