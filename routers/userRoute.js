import express from 'express';
import {authUser, editUser, getUserProfile, resetPass} from '../controllers/userController.js';
import { auth} from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const userRouter =express.Router()



userRouter.route("/login").post(authUser)
userRouter.route('/resetPass').post(resetPass)
userRouter.route('/userProfile/:id').get(auth, getUserProfile) 
userRouter.route('/updateUser/:id').post(auth,admin,editUser)
     

export default userRouter 