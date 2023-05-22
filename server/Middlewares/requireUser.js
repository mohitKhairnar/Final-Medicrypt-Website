//Here our requirement is post or medical form will be visible to them only, those who are purely authenticated with token.
const jwt = require('jsonwebtoken');
const { success,error } = require("../utils/responseWrapper");
module.exports = async (req,res,next)=>{
    if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
        // return res.status(401).send("Authorization header is required");
        return res.send(error(401,"Authorization header is required"));
    }
    //The above if can also be written as !req.headers?/authorization?.startsWith("Bearer")
    const accessToken = req.headers.authorization.split(" ")[1];

    try{
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req._id = decoded._id;
        next();
    }
    catch(e){
        console.log(e);
        // return res.status(401).send("Invalid access key");
        return res.send(error(401,"Invalid access key"));
    }

    next();
}