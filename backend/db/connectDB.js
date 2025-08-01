import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("MOngoDB Connected: ",conn.connection.host)
    } catch (error) {
        console.log("Error connection to mongoDB: ", error.message);
        process.exit(1); //1 is failure, 0 status code is success
    }
}