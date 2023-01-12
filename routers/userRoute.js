import express from 'express';
import { addUser, authUser, deleteUser, editUser, getUserProfile, getUsers, uploadFile } from '../controllers/userController.js';
import { auth} from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const userRouter =express.Router()


userRouter.route("/register").post(addUser)
userRouter.route("/upload").post(uploadFile)
userRouter.route("/login").post(authUser)
userRouter.route('/profiles').get(auth, admin,getUsers)
userRouter.route('/userProfile/:id').get(auth, getUserProfile) 
userRouter.route('/updateUser/:id').post(auth,admin,editUser)
userRouter.route('/deleteUser/:id').get(auth,admin,deleteUser)
     

export default userRouter 