import mongoose, { connect } from "mongoose";

export const connectDB=async()=>{
    try{
        mongoose.connection.on('connected',()=>console.log("Database Connected")
    )
        await mongoose.connect(`${process.env.MONGODB_URI}`)

    }catch(err){
console.error(err.message)
    }
}
