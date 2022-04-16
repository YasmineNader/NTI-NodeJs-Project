const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Admin = require('../models/admin.model')
const bcryptjs=require('bcryptjs')
const auth = require('../middleware/Auth')
const Product = require("../models/product.model");

router.post('/user/SignUp', async(req,res)=>{
    
    try{

        user = new User(req.body)
        adminsEmail= await Admin.find({email:req.body.email})
        if(adminsEmail.length){
          res.send({"Message":"This account Not Available"})

        }else{

        await user.save()
        res.status(200).send({"Message":"User Now Has an Account"})
      }
    }catch(e){
        res.status(500).send({"Message":"This Email Is Already Exist"})
    }
    
    
    
    })

router.post('/user/login',async(req,res)=>{
    try{
    userData=req.body
    user = await User.findOne({email:userData.email})
    if(user==null ){
        throw new Error ('Inavlid Email')
    }
    const matchPassword = await bcryptjs.compare(userData.password,user.password)
    if( matchPassword==false){
        throw new Error ('Inavlid Password')
   }
   const token = await user.generateToken()
   res.status(200).send({"token":token,"name":user.name,"id":user._id,"UserType":user.UserType})
    }catch(e){
    res.status(500).send(e.message)
}


})

router.post('/user/logOut',auth.userAuth,async(req,res)=>{
    
    req.user.tokens=[]
    await req.user.save()
    res.status(200).send({"Message":"You are Logged Out From All Devices"})
})

// ,auth.userAuth,
router.get("/user/allProducts", async (req, res) => {
    try {
      products = await Product.find();
      res.status(200).send(products);
    } catch (e) {
      res.status(500).send(e.message);
    }
  })

  router.delete('/user/delete',auth.userAuth, async (req, res) => {
    try {
        req.user.remove()
      res.status(200).send({"Message":"Your Account Is Deleted"});
    } catch (e) {
      res.status(500).send(e);
    }
  })

module.exports=router