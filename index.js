const express=require("express");
const { connection } = require("./config/db");
const cors=require("cors");
const { createRouter } = require("./Routes/CreateUser");
const { dataRouter } = require("./Routes/Data");
const { OrderRouter } = require("./Routes/Order");
const app=express();

app.use(express.json());
app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>{
    res.send({ msg: "this is base API url" });
})

app.use("/user",createRouter)
app.use("/data",dataRouter)
app.use("/data", OrderRouter);

const PORT=process.env.PORT
app.listen(PORT,async()=>{
    try {
        await connection;
        console.log(`server is running on port ${PORT}`)
    } catch (error) {
        console.log("could not be connected")
    }
})