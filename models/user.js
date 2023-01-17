import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema(
 {
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Department",
        required:false,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:false,    
    },
    dateOfBirth:{
        type:Date,
        default : Date.now,
        required:false,    
    },
    dateOfJoin:{
        type:Date,
        default : Date.now,
        required:false,    
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    post:{
        type:String,
        required:false,
        enum : ["STAFF", "TEAM LEAD", "ADMIN"]
    },
   
    soldOfLeaves : {
        type : Number,
        default : 25,
    },
    isAdmin:{
        type:Boolean,
        required:false,
        default:false,
    },
},
    {
        timestamps:true,
    
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt =await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User',userSchema)  
export default User