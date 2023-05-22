const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require('./Routers/authRouter');
const patientRouter = require('./Routers/patientRouter')
const detailssaveRouter = require('./Routers/detailsaveRouter')
const displayRouter = require('./Routers/displayRouter')
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require('cors');
dotenv.config('./.env');

const app = express();

//Middlewares
app.use(morgan('common'));   //Common chije print ho jayegi 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use("/auth",authRouter);
app.use("/patient",patientRouter);
app.use('/save',detailssaveRouter);
app.use('/display',displayRouter);
app.get('/',(req,res)=>{
    res.status(200).send("All good");
})
const PORT = process.env.PORT || 4000;

app.get('/logout',(req,res)=>{
    res.cookie('jwt',"",{maxAge: 1});
    // localStorage.removeItem('access_token');
    res.send("Success in deleting jwt")
    // res.redirect("/login");
})

dbConnect();

app.listen(PORT,()=>{
    console.log(`Listening on PORT: ${PORT}`);
});    



// DRuIbk3lmGzFOhSw