// require('dotenv').config({path: "./env"})
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({ path: "./env" });

// async function so after completion it returns a promise
connectDB()
    .then(() => {
        // ! here listening means server start, and "app" started listening using mongo database
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB Connection Failed : " + err.message);
    })





















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