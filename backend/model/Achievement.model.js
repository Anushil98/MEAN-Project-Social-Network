const mongoose= require('mongoose');

const Achschema=mongoose.Schema({
    Username:{ type: String, required: true},
    Certificate_no:{ type: String, required: true},
    Certificate_Name: { type: String, required: true},
    Issued_By: { type: String, required: true},
    Date_Of_Issue:{ type: Date, required: true}
});

module.exports=mongoose.model('Achievement',Achschema);