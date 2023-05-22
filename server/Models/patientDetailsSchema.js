const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    patientAge: {
        type: Number,
        required: true,     
    },
    patientWeight: {
        type: Number,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    medicines:{
        type: [{medicineName: String, medicineQuantity: Number, medicineTime: String}],
    },
    tests:{
        type:[String]
    },
    reports: {
        type: [String],
    },
    patientId:{
        type:String,
    },
    filePath:{
        type:String,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }


})

module.exports = mongoose.model('details',patientSchema);