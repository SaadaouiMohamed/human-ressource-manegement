import mongoose from "mongoose";

const permissionSchema = mongoose.Schema({
    employeeId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    type :{
        type : String,
        enum :['matin', 'midi'],
    },
    adminResponse :{
        type :String,
        enum: ["Pending", "Rejected", "Approved"],
        default : 'Pending',
    }
},
{
    timestamps : true,
});


const Permission = mongoose.model('Permission',permissionSchema)

export default Permission