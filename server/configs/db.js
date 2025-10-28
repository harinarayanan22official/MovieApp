import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const dbConnection= async()=>{
      
    try{
        mongoose.connection.on('connected',()=>{
             console.log('database is connected');
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/quickShow`)
    }
    catch(err){
        console.log(err);
    }

}

export default dbConnection;