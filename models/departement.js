import mongoose from 'mongoose'


const departmentSchema = mongoose.Schema({
    departmentName :{
        type : String,
        required : true,
        unique : true
    },
    departmentShortName : {
        type: String,
        required : true,
        unique : true,
    }
},
    {timestamps : true}
    )


    const Department = mongoose.model("Departement",departmentSchema)

    export default Department;