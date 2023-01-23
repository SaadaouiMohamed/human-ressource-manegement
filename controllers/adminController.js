import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utilities/createToken.js'
import multer from 'multer'
import nodemailer from 'nodemailer'
import { sendConfirmationMail } from '../config/nodeMailer.js'
import Department from '../models/departement.js'


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
    const {departmentId,firstName,lastName,image,phone,email,password,isAdmin,post,gender,dateOfBirth,dateOfJoin} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400).json({err : 'User already exists'});
        
    }

    const user = await User.create({
        departmentId,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        dateOfJoin,
        image,
        phone,
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

const authAdmin = asyncHandler(async(req,res)=>{
    const { email, password}=req.body
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            firstName:user.firstname,
            lastName:user.lastName,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        });
        
    }else {
        res.status(401).send('invalid email or password')
        
        
       
    }
})


/******************** Add New Department && display departments
 * access private admin  
 ******************/


const addDepartment = asyncHandler(async(req, res) => {
    const department = new Department({
        departmentName : req.body.departmentName,
        departmentShortName : req.body.departmentShortName,
    })
   department.save() 
   res.status(201).send('depatment added with success')
})


const displayDepartment = asyncHandler(async(req, res) => {
    const departement = await Department.find()
    res.status(201).json({departement:departement})
})

/******************** Get all users 
 * access private admin  
 ******************/

const getUsers = asyncHandler (async (req,res)=>{
    const users = await User.find({})
    res.json(users)
})


/******************** update user profile ********************/

const editUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(user){
        user.departmentId = req.body.departmentId || user.departmentId
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.gender = req.body.gender || user.gender
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
        user.dateOfJoin = req.body.dateOfJoin || user.dateOfJoin
        user.image = req.body.image || user.image
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        user.post = req.body.post || user.post
        user.isAdmin = req.body.isAdmin || user.isAdmin
        
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



export {uploadFile, addUser, authAdmin, addDepartment,displayDepartment, getUsers, editUser, deleteUser}