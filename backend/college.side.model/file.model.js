const mongoose= require('mongoose');
const fileSchema=mongoose.Schema({
    col_id: { type: String, required: true},
    filename: {type: String, required: true},
    description:{type: String, required: true}
});

module.exports=mongoose.model('CollegeFile',fileSchema);