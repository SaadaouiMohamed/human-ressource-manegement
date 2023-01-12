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




export {requestLeave}