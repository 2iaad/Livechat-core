import mongoose from "mongoose";

/**
 *  initiate a connection between app & mongoDB
 */
export const connectDB = async () => {
try {

        const con = await mongoose.connect(process.env.MONGODB_URI!);
        console.log(`mongoDB connected ${con.connection.host}`)
    }
    catch (error) {
        console.log("mongoDB connection error", error)
    }
}