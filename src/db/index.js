import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {

    try {
        // mongoose gives return object
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDb Connected !! DB HOST: , ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoBD Database Connection Failed :", error);
        process.exit(1);
    }
}

export default connectDB;