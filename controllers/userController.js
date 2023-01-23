import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import generateToken from '../utilities/createToken.js'

import nodemailer from 'nodemailer'
import { sendConfirmationMail, sendResetPassword } from '../config/nodeMailer.js'
import Department from '../models/departement.js'
import { randomCode } from '../utilities/generateRandom.js'







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
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        });
        
    }else {
        res.status(401).send('invalid email or password')
        
        
       
    }
})





/***************** get user profile *******************/


const getUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
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
        
        if(req.body.password){
        user.password = req.body.password
        }
        const updateUser = await user.save() 
        
        res.status(200).json({
            _id:updateUser._id,
            firstName:updateUser.firstName,
            lastName:updateUser.lastName,
            email:updateUser.email,
            message : "profile updated with success",
           
        })
    } else{
        res.status(404).json({err:'User not found'})
    }
    })



    /****************************** reset password *************************/

    const resetPass = asyncHandler(async(req, res) =>{
        const user =await User.findOneAndUpdate(
            {email : req.body.email},
            { resetPass : randomCode().password},
           {
            new : true
           }
           )
           if(user){
            sendResetPassword(req.body.email, randomCode())
            res.status(201).json({message:'email de reinitialisation envoyé avec succes',user:user})
           }else{
            res.status(401).send('aucun compte est associé avec cette email')
           }
    })



export {authUser,getUserProfile,editUser,resetPass}