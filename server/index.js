require('dotenv').config()
const express=require('express');
const connectDb = require('./database/db');
const userRouter=require('./routers/user.routes')
const app=express();

app.use(express.json());


app.use('/api/user',userRouter);



const PORT=process.env.PORT || 3000
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>{
    console.log("Connection Failed=>", error);
})