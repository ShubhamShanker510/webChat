require('dotenv').config()
const express=require('express');
const connectDb = require('./database/db');
const userRouter=require('./routers/user.routes')
const meetRouter=require('./routers/meeting.router')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express();

app.use(express.json());

app.use(cookieParser())

app.use(cors({
    path: 'http://localhost:5173/',
    credentials: true
}))

app.use('/api/user',userRouter);
app.use('/api/meet',meetRouter);




const PORT=process.env.PORT || 3000
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>{
    console.log("Connection Failed=>", error);
})