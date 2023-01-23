import express from 'express';
import {authUser, editUser, getUserProfile, resetPass} from '../controllers/userController.js';
import { auth} from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { uploadFile } from '../controllers/adminController.js';

const userRouter =express.Router()



userRouter.route("/login").post(authUser)
userRouter.route('/resetPass').post(resetPass)
userRouter.route('/userProfile/:id').get(auth,getUserProfile) 
userRouter.route('/updateUser/:id').post(auth,editUser) 
userRouter.route("/upload").post(uploadFile) 
     

export default userRouter 