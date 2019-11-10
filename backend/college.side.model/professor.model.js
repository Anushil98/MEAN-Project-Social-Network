const mongoose = require('mongoose');
const professor = mongoose.Schema({
    col_id: { type: String, required: true },
    Designation: { type: String, required: true },
    First_Name: { type: String, required: true },
    Middle_Name: { type: String },
    Last_Name: { type: String, required: true },
    Experience: { type: Number, required: true },
    prof_img: {type: String, required: true}
});

module.exports = mongoose.model('Professor', professor);