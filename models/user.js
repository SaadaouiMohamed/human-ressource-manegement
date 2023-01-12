import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema(
 {
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
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
    telNum:{
        type:Number,
        required:true,
    },
    post:{
        type:String,
        required:false,
    },
    //  leavesReq:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Leave",
    // }],
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