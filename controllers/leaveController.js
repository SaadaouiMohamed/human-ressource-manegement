import asyncHandler from 'express-async-handler';
import Leave from '../models/leave.js';
import User from '../models/user.js';
import dayjs from 'dayjs'

const requestLeave = asyncHandler(async(req , res) => {
    const {type , startDate , endDate} = req.body;
    const employee =await User.findById(req.params.id);
    
    const leave = new Leave({
        type,
        startDate,
        endDate,
        employeeId : employee._id,
    })
    console.log("user",employee._id)
    
//   employee.leavesReq.push(leave)

const date1 = dayjs(endDate)
const dateDiff = date1.diff(startDate,'day')

employee.soldOfLeaves = employee.soldOfLeaves - Number(dateDiff)

 await employee.save()
await leave.save()
res.status(201).json({message : 'leave request added successfuly'})
})


/*********************** Leave Admin lists ********************/

const leavesAdminList = asyncHandler((async(req,res) =>{
    const leaves = await Leave.find({adminResponse:"Pending"})
    if(leaves){
        res.status(201).json({leaves})
    }
    res.status(401).send("no leaves request")
}))




/************************* employee leave lists ***************/


const employeeLeaves = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id)
    const leaves = await Leave.find({employeeId : req.params.id})
    
    if(leaves){
        res.status(201).json({leaves:leaves,user:user})
    } 
    res.status(401).send('the leave list is empty')
 }) 



 /******************************** admin response ****************************/


 const addAdminResponse = asyncHandler(async(req,res) =>{
    const response = await Leave.findById(req.params.id)
    
    if(response){
        response.adminResponse = req.body.adminResponse
        const updateResponse =await response.save()
       return res.status(201).json({responseLeave:updateResponse,message:'admin response updated'})
        
    }
    res.status(404).json({err:'leave request not found'})
 })


export {requestLeave,leavesAdminList,employeeLeaves, addAdminResponse}
