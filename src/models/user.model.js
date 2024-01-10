import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(

    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,   // Cloudanary service used because it is free
            required: true,
        },
        coverImage: {
            type: String,
        },
        // array of objects (dependent on Video Schema ID , "type will be ObjectId and ref from Video Schema")
        // this field is complicated ,  
        
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }

        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String,
        }

    },

    {
        timestamps: true

    }

)


// we cann't encrypt/decrypt data directely so used mongoose midleware "pre" so that just before saving data we can  encrpt user data .And midleware have access of (req,res,next) . callback function takes time so that async and used normal function because we need refrance of user Schema objects

userSchema.pre("save", async function (next) {
    // if password is not modified then don't encrypt and save
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
})


// we have some methods given by mongoose  but can design custome methods also,
// {in Schemas we get one object "methods" and here can add different custome methods}
// here for password checking 
// All the methods we make , we should inject in Schema 

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.generateAccessToken = async function () {
    jwt.sign(
        {
            // payloadName:data comming from database
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefressToken = async function () {
    jwt.sign(
        {
            // payloadName:data comming from database
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
 }

export const User = mongoose.model("User", userSchema);

