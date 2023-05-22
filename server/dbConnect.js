const mongoose = require('mongoose');

module.exports = async()=>{
    const mongoUrl = "mongodb+srv://mohitkhairnar9486:Ar8sux7JC4CES39N@cluster0.0d7uivj.mongodb.net/?retryWrites=true&w=majority";
    try{
        const connect = await mongoose.connect(mongoUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected Successfully");
        // const dataSchema = new mongoose.Schema({
        //     doctorName: String
        // })
        // const Data = mongoose.model('Data', dataSchema);
        // app.get('/api/data', (req, res) => {
        //     Data.find((err, data) => {
        //       if (err) {
        //         console.error(err);
        //         res.status(500).send('Error retrieving data from database');
        //       } else {
        //         res.json(data);
        //       }
        //     });
        //   });
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}