import { config } from "dotenv";
import mongoose from "mongoose";

config();

/**
 *  initiate a connection between app & mongoDB
 */
export const connectDB = async () => {
try {

        const con = await mongoose.connect(process.env.MONGODB_URI!);
        console.log(`-> MongoDB connected (${con.connection.host})\n`)
    }
    catch (error) {
        console.log("-> MongoDB connection error", error)
    }
}