import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'


//   we configure cookieParser and cors after app made
// cookieParser is used for accessing users browser cookies from server and can also set that cookies and can perform crud operation on cookies

const app = express();
// "use" methods comes for all configration and midlewares , setting cors(), can set cors() configration in object formate , CORS_ORIGIN variables should be allowed first
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// ! In app data will come from different places exp -> url , json , body(form) , direct form ,json form . json doesn't mean unlimited json data there should be limit . will not crash server
// so configrations and settings

// form data configuration
app.use(express.json({ limit: "16kb" }))

// url data configuration (extended means we can give more nested objects )
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// some times we need to store some public file and folders for that
app.use(express.static("public"))

app.use(express.cookieParser())




export default app;