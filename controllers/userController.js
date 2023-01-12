import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import nodemailer from 'nodemailer'
import { sendConfirmationMail } from '../config/nodeMailer.js'



/*************** functions **************/

function generateToken(id){
    return jwt.sign({id},"HRMS",{
        expiresIn:"30d",
    });
}

/******************* upload image ******************/

const storage = multer.diskStorage({
    destination : function(req,res,cb){
        cb(null,'images')
    },
    filename : function(req,file,cb){
        cb(null,Date.now() +"-"+ file.originalname)
    }
})


const upload = multer({storage:storage}).single('file')


const uploadFile = asyncHandler(async(req,res) => {
    upload(req,res,(err) =>{
        if(err){
            res.sendStatus(500)
        }
        res.send(req.file)
    })
})

/*************** register ***************/

const addUser = asyncHandler(async(req,res)=>{
    const {firstName,lastName,image,telNum,email,password,isAdmin,post} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400).json({err : 'User already exists'});
        
    }

    const user = await User.create({
        firstName,
        lastName,
        image,
        telNum,
        email,
        password,
        post,
        isAdmin,
    });

    if (user){
        res.status(201).json({
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            isAdmin:user.isAdmin,
            //password:req.body.password
        })
        sendConfirmationMail(
            user.firstName,
            user.lastName,
            user.email,
            req.body.password
        )
    } else {
        res.status(400).json({err : 'Invalid user data'});
        
    }
})



/******************* login **************/

const authUser = asyncHandler(async(req,res)=>{
    const { email, password}=req.body
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            firstName:user.firstname,
            lastName:user.lastName,
            email:user.email,
            telNum:user.telNum,
            image:user.image,
            post:user.post,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        });
        
    }else {
        res.status(401).send('invalid email or password')
        // json({err :'Invalid email or password'});
        
       
    }
})



/******************** Get all users 
 * access private admin  
 ******************/

const getUsers = asyncHandler (async (req,res)=>{
    const users = await User.find({})
    res.json(users)
})


/***************** get user profile *******************/


const getUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).populate()
    if(user){
        res.json({user:user})
    } else {
        res.status(404).json({err : 'user not found'})
    }
})


/******************** update user profile ********************/

const editUser = asyncHandler(async(req,res) => {
const user = await User.findById(req.params.id)
if(user){
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.image = req.body.image || user.image
    user.email = req.body.email || user.email
    user.telNum = req.body.telNum || user.telNum
    user.post = req.body.post || user.post
    user.isAdmin = req.body.isAdmin || user.isAdmin
    if(req.body.password){
    user.password = req.body.password
    }
    const updateUser = await user.save()
    
    res.status(200).json({
        _id:updateUser._id,
        firstName:updateUser.firstName,
        lastName:updateUser.lastName,
        email:updateUser.email,
        image:updateUser.image,
        telNum:updateUser.telNum,
        post:updateUser.post,
        isAdmin:updateUser.isAdmin
    })
} else{
    res.status(404).json({err:'User not found'})
}
})


/*************** delete user *****************/

const deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({success : "delete profile with success"})
})


export {addUser,authUser,uploadFile,getUsers,getUserProfile,editUser,deleteUser}