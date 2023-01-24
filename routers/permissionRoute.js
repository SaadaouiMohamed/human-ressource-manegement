import express from 'express';
import { auth } from '../middleware/auth.js';
import { addPermissionReq, permissionAdminList, permissionAdminRes, permissionUserList } from '../controllers/permissionController.js';
import { admin } from '../middleware/admin.js';

const permissionRouter = express.Router()

permissionRouter.route('/addPermission/:id').post(auth,addPermissionReq);
permissionRouter.route('/permissionList').get(auth,admin,permissionAdminList);
permissionRouter.route('/employeePermissionList/:id').get(auth,permissionUserList);
permissionRouter.route('/addAdminResponse/:id').post(auth,admin,permissionAdminRes)


export default permissionRouter;