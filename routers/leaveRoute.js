import express from 'express';
import { requestLeave } from '../controllers/leaveController.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';


const leaveRouter = express.Router()


leaveRouter.route('/:id/addLeave').post(auth,requestLeave)

export default leaveRouter