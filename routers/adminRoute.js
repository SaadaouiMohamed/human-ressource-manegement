import express from 'express';
import { auth} from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import {
  addDepartment,
  addUser,
  authAdmin,
  deleteUser,
  displayDepartment,
  editUser,
  getUsers,
  uploadFile,
} from "../controllers/adminController.js";


const adminRouter = express.Router()


adminRouter.route("/register").post(auth, admin, addUser)
adminRouter.route("/upload").post(uploadFile)  
adminRouter.route("/loginAdmin").post(authAdmin)
adminRouter.route('/profiles').get(auth, admin, getUsers)
adminRouter.route("/addDepartment").post(addDepartment)
adminRouter.route("/displayDepartment").get(displayDepartment) 
adminRouter.route('/adminUpdateUser/:id').post(auth,admin,editUser)
adminRouter.route('/deleteUser/:id').get(auth,admin,deleteUser)



export default adminRouter