import asyncHandler from 'express-async-handler';
import Permission from '../models/permission.js';
import User from '../models/user.js';

/****************** user permission request *****************/

const addPermissionReq = asyncHandler(async(req , res) => {
   const user = await User.findById(req.params.id)

   const permission = new Permission({
    type :req.body,
    employeeId : user._id,
   })

   await permission.save()
   res.status(201).json(
    {employeeId : user._id,
     message : "Permission request added with success",   
})
})


/******************************** Admin Permission List  *****************/


const permissionAdminList = asyncHandler(async(req , res) => {
    const permission = await Permission.find({adminResponse : 'Pending'});
    if (permission){
        res.status(201).json({permission})

    }
    res.status(401).send('Permission not found')
})



/************************** User Permission List ************************/

const permissionUserList = asyncHandler(async(req ,res) =>{
    const user = await User.findById(req.params.id)
    const permission = await Permission.find({employeeId : req.params.id})

    if(permission){
        res.status(201).json({permission : permission, user: user})

    }
    res.status(401).send('List is empty')
})


/******************** Permission Admin Response *********************/


const permissionAdminRes = asyncHandler(async(req , res) => {
    const response = await Permission.findById(req.params.id)

    if(response){
        response.adminResponse = req.body.adminResponse
        const updateResponse = await response.save()
        return res.status(201).json({
            permissionRes : updateResponse,
            message : "admin response for permission has been updated"
        })
    }
    res.status(401).send('permission request not found')
})

export {addPermissionReq, permissionAdminList, permissionUserList, permissionAdminRes}