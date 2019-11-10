const mongoose= require('mongoose');
const fileSchema=mongoose.Schema({
    username: { type: String, required: true},
    filename: {type: String, required: true},
    description:{type: String, required: true}
});

module.exports=mongoose.model('File',fileSchema);