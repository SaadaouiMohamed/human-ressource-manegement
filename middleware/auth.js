import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import jwt from 'jsonwebtoken'


const auth = asyncHandler(async(req,res,next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,"HRMS");
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({err :'please login'});
            throw new Error ('Not authorized, token failed');

        } 
    }
    if (!token){
        res.status(401).json({err:'please login'})
    }
})


export {auth}