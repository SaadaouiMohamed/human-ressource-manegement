import express from 'express';
import { addAdminResponse, employeeLeaves, leavesAdminList, requestLeave } from '../controllers/leaveController.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';


const leaveRouter = express.Router()


leaveRouter.route('/addLeave/:id').post(auth,requestLeave)
leaveRouter.route('/leavesList').get(auth,admin,leavesAdminList)
leaveRouter.route('/employeeLeavesList/:id').get(auth, employeeLeaves)
leaveRouter.route('/addAdminResponse/:id').post(auth, admin, addAdminResponse)

export default leaveRouter