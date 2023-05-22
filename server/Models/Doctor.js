const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    myPatients: {
        type: [String]
    }
})
module.exports = mongoose.model('doctor',doctorSchema);