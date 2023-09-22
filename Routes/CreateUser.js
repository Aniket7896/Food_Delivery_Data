const express = require("express");
const { UserModel } = require("../models/user.models");
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const createRouter = express.Router();

createRouter.post(
  "/signup",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, location } = req.body;
      bcrypt.hash(password, 5, async function (err, hash) {
       if(err){
        res.send({msg:"Something went wrong..."})
       }
       else{
        const new_user = new UserModel({
          name,
          email,
          password:hash,
          location,
        });
        await new_user.save();
        res.json({ success: true });
       }
      });
      
    } catch (error) {
      res.json({ success: false });
    }
  }
);

createRouter.post(
  "/login",
  [
    (body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 })),
  ],
  async (req, res) => {
    const { email,password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userData = await UserModel.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Something went wrong..... " });
      }
     else{
        const hashed_password=userData.password;
       bcrypt.compare(password, hashed_password, function (err, result) {
         if(result){
            const token = jwt.sign({ userId:userData._id }, process.env.SECRET_KEY);
        res.json({ success: true ,token:token});
        }
        else{
            res.send({msg:"SignUp first"});
        }
       });
     }
    } catch (error) {
      res.json({ success: false });
    }
  }
);
module.exports = { createRouter };
