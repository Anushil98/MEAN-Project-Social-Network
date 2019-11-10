const mongoose= require('mongoose');

const friendSchema= mongoose.Schema({
    username:{type: String,required: true},
    friend:{type: String,required: true}
});

module.exports=mongoose.model('Friend',friendSchema);