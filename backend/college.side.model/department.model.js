const mongoose= require('mongoose');

const  depSchema= mongoose.Schema({
    col_id: {type: String, required: true},
    dept_name:{type: String, required: true}
});

module.exports=mongoose.model('Department',depSchema);