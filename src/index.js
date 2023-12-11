// require('dotenv').config({path: "./env"})
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({path:"./env"});


connectDB()






















// ! this is one good approch ,  db connection function written in IIFE did't poluted any thing outside . BUT PROBLEM IS INDEX FILE IS LITTLE BIT POLUTED 

/*

import express from "express";
const app = express();
;(async () => {

    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', (error) => {
            console.log(error);
            throw error;
        })

        app.listen(process.env.PORT, function () {
            console.log(`App listening on PORT ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
})()

*/