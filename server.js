import express from 'express'
import cors from 'cors'
import  path  from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/userRoute.js'
import leaveRouter from './routers/leaveRoute.js'




const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/api',userRouter)
app.use('/api',leaveRouter)

/***** to fix deprecationwarning mongoose the strict query */
mongoose.set('strictQuery', false)

/************************ connect DB ******************/

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://mohamed:hamma08878847@cluster0.qajrreh.mongodb.net/HMRS?retryWrites=true&w=majority"
        )
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    }
    catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}

connectDB()


const Port = 5000
app.listen(Port,() => {
    console.log(`Listenning in port ${Port}`)
})