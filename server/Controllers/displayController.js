// detailsController.js
const details = require('../Models/patientDetailsSchema');

exports.detailsFetch = async (req, res) => {

  
    const id = req.params.id;

    const data = await details.findById({_id:id});
    console.log(data);
    res.json(data);
}  