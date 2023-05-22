const User = require('../models/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {error,success} = require("../utils/responseWrapper")
const signupController = async (req,res)=>{
    try{
        const {name,email,mobile,password} = req.body;
        
        if(!email || !password){
            // return res.status(400).send("All fields are required");
            return res.status(400).send({error: "All fields are required"});
        }
        const oldUser = await User.findOne({email});
        if(oldUser){
            // return res.status(409).send("User is already registered");
            return res.status(409).send({error: "User is already registered"});
        }
        const hashedPassword = await bcrypt.hash(password,10); //10 is a salt value over here
        // console.log("Password Hashed");
        // console.log(hashedPassword);
        const user = await User.create({
            doctorName:name,
            email,
            mobile,
            password: hashedPassword,
        })
        // return res.status(201).json({
        //     user,
        // });
        return res.send(success(201,{
            user,
        }))
    }
    catch(error){
        console.log(error);
    }
}
const loginController = async (req,res)=>{
    try {
        const { email, password } = req.body;
        console.log(req.body);
        
        if(!email)
        {
            email='';
        }
        if(!password)
        {
            password = '';
        }
        if (email == '' || password == '') {
            // return res.status(400).send("All fields are required");
            return res.status(400).send({error: "All fields are required"});
        }

        const user = await User.findOne({ email });
        if (!user) {
            // return res.status(404).send("User is not registered");
            // res.data.status = "User is not registered";
            return res.status(404).send({error: "User is not registered"});     
        }
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            // return res.status(403).send("Incorrect password");
            console.log("Kardanslaj");
            return res.status(403).send({error: "Incorrect Password"});
        }

        const accessToken = generateAccessToken({
            _id: user._id,
        });
        const refreshToken = generateRefreshToken({
            _id: user._id,
        });

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return res.send(success(200, { email,password,accessToken }));
    } catch (e) {
        return res.send(error(500, e.message));
    }
}

//This api will check the refreshToken validity and generate the new accessToken
const refreshAccessTokenController = async (req,res)=>{
    // const cookies = req.cookies;
    // res.cookie('jwt','',{maxAge: 1});
    // const token = req.cookies[]
    if(!cookies.jwt){
        // return res.status(401).send("Refresh token in cookie is required");
        return res.send(error(401,"Refresh token in cookie is required"));
    }
    const refreshToken = cookies.jwt;  
    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id = decoded._id;
        const accessToken = generateAccessToken({_id});
        // return res.status(201).json({accessToken});
        return res.send(success(201,{accessToken}));
    }
    catch(error){
        console.log(error);
        // return res.status(401).send("Invalid refresh key");
        return res.send(error(401,"Invalid refresh key"));
    }
}


//functions to generate access token..ye internal function hoga esse hum export nahi kar rahe honge
//accessToken will be store at local storage
const generateAccessToken = (data)=>{
    const token = jwt.sign(data,process.env.ACCESS_TOKEN_PRIVATE_KEY,{
        expiresIn: '1y',
    });
    console.log(token);
    return token;
}
//Refresh token will get store at cookies
const generateRefreshToken = (data)=>{
    const token = jwt.sign(data,process.env.REFRESH_TOKEN_PRIVATE_KEY,{
        expiresIn: '1y',
    });
    console.log(token);
    return token;
}
module.exports = {
    signupController,
    loginController,
    refreshAccessTokenController
}