import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app=express()
const connect=()=>{
    mongoose.connect("mongodb+srv://jaya:jayasatwik1234@cluster0.f2iyvoz.mongodb.net/youtube?retryWrites=true&w=majority")
    .then(()=>{
        console.log("connected to DB");
    }).catch(err=>{
      throw err;
    })
}
app.use(cors());
app.use(cookieParser())

app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)
app.use((err,req,res,next)=>{
const status=err.status||500;
const message=err.message||"something wrong";
return res.status(status).json({
    success:false,
    status,
    message
})
})
app.listen(8800,()=>{
    connect();
    console.log("connected to server");
})
