const express=require("express");
const { DataModel } = require("../models/data.model");
const { CategoryModel } = require("../models/category.model");
const dataRouter=express.Router();

dataRouter.get("/products",async(req,res)=>{
    try {
            const data=await DataModel.find();
            const categoryData=await CategoryModel.find();
              const combinedData = [data, categoryData];
              res.send(combinedData);
    } catch (error) {
        res.send(error.message);
        console.log(error)
    }
})
module.exports={dataRouter}