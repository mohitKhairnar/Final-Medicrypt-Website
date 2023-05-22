const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,   //It's will be required
        unique: true,     //Should be unique
        lowercase: true   //Even user enters capital it will get small
    },
    weight: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    medicines:{
        type: [{medicineName: String, medicineQuantity: Number, medicineTime: String}],
    },
    reportsRequired: {
        type: [String],
    },

})

module.exports = mongoose.model('patient',patientSchema);