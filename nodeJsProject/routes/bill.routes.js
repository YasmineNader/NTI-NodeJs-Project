const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const user = require("../models/user.model");
const auth = require("../middleware/Auth");
const product = require("../models/product.model");
const bill = require("../models/bill.model");

router.post('/user/bills',auth.userAuth, async (req, res) => {
    try {
        // amount=0
        // totalprice=0

        productID = await product.find()
        // console.log(productID)
        bills = new bill(req.body)
        bills.totalprice=0
        bills.products.forEach((element) =>{
          
             //for each element
            element.amount = Number(element.price)*Number(element.quantity)
            //for total price
            bills.totalprice+=Number(element.price) * Number(element.quantity)
             
            bills.orderStatus="Confirmed"
            productID.forEach(pro=>{
                //  console.log(pro.stock+"stock")
                //  console.log(element.quantity+"quantity")

                 //console.log(element._id)
                 //console.log(pro._id)
                // console.log(element._id + " and pro***"+pro._id);
                // console.log(typeof element._id )
                // console.log(typeof pro._id )
                if(element._id.toString()==pro._id.toString())
                {

                 //stock=Number(pro.stock)-Number(element.quantity)
                // pro.stock=pro.stock-element.quantity
                
                 pro.stock-=element.quantity
                 //console.log(stock+"result")
                  pro.save()

              }

            })

            
            // console.log(element.amount)
           // console.log(element.price*element.quantity)
            //all+= Number(element.price) * Number(element.quantity)
            //console.log(element.price*element.quantity)
            //console.log(all)
        });

        // await productID.save()

       // await bills.save()
       await bills.save()

       userBills= await bill.find()

      res.status(200).send({'Message':'bill Is created','bill':userBills});
    } catch (e) {
      res.status(500).send(e.message);
    }

  });
  
  router.get('/admin/Userbills',auth.adminAuth, async (req, res) => {
    try {
        
       bills = await bill.find()

       res.status(200).send(bills);
    } catch (e) {
      res.status(500).send(e.message);
    }

  });
  
  router.get('/admin/status/:id',auth.adminAuth, async (req, res) => {
    try {

       billId=req.params.id
       bills = await bill.findById({ _id:billId })
      //  console.log(bills.orderStatus)
       bills.orderStatus="delivered"
       bills.save()

       res.status(200).send({"Message":"status is changed", "data":bills});
    } catch (e) {
      res.status(500).send(e.message);
    }

  });

    
  router.get('/admin/cancelOrder/:id',auth.adminAuth, async (req, res) => {
    try {

       billId=req.params.id
       bills = await bill.findById({ _id:billId })
      //  console.log(bills.orderStatus)
       bills.orderStatus="Cancelled"
       bills.save()

       res.status(200).send({"Message":"status is changed", "data":bills});
    } catch (e) {
      res.status(500).send(e.message);
    }

  });

  
  module.exports=router
  