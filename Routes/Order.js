const express=require("express");
const { OrderModel } = require("../models/order.model");
const OrderRouter=express.Router();

OrderRouter.post("/orderData",async(req,res)=>{
    const {order_data,email}=req.body;
    await order_data.splice(0,0,{order_date:req.body.order_date});
    let emailID=await OrderModel.findOne({email});
    console.log(emailID)

    if(emailID===null){
     try {
          let data = await OrderModel({
            email,
            order_data,
          });
          await data.save();
          res.send({ success: true });
     } catch (error) {
        console.log(error);
        res.send({error})
     }
    }else{
        try {
         await OrderModel.findOneAndUpdate({email},{$push :{order_data:order_data}})
            res.send({success:true})
        } catch (error) {
            res.send("Server Error",{error})
        }
    }

})

/*========================================================================= */
// OrderRouter.get("/orderHistory/:email", async (req, res) => {
//   const email = req.params.email;

//   try {
//     const orders = await OrderModel.find({ email });
//     console.log(orders)
//     res.json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// OrderRouter.post("/myOrder", async (req, res) => {
//   const { email } = req.body;
//   try {
//     let emailId = await OrderModel.findOne({ email });
//     console.log(emailId);
//     res.json({ orderData: emailId });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

OrderRouter.post("/myOrder", async (req, res) => {
  const { email } = req.body;
  try {
    let emailId = await OrderModel.findOne({ email });
    console.log(emailId);
    res.json({ orderData:emailId });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
OrderRouter.get("/order", async (req, res) => {
  const { email } = req.body;
  try {
    let emailId = await OrderModel.findOne({ email });
    console.log(emailId);
    res.json({ orderData: emailId });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports={OrderRouter}