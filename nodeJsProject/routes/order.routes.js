const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const user = require("../models/user.model");
const auth = require("../middleware/Auth");
const product = require("../models/product.model");

router.get("/user/orderDetails/:id", auth.userAuth, async (req, res) => {
  try {
    productID = req.params.id
    productdata = await product.findById({_id:productID})
;
    
    res.status(200).send({"productData":productdata});
  }catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/user/AddOrder/:id", auth.userAuth, async (req, res) => {
  try {
    productID = req.params.id
    productdata = await product.findById({_id:productID})
    order = new Order(req.body);
    console.log(order)

    // console.log(productdata.stock)
    // products[0]
     console.log(order.products)
    if(!order.products.length){
      res.send({"productData":productdata,"Message":"Please Enter Order"})
    }
    else if(productdata.stock<order.products[0].quantity){

      res.send({'Message':'There is no enough stock'})
    }
    else{
    order.orderStatus="pending"
    await order.save();

    res.status(200).send({"productData":productdata,"Message":"Order Is Done"});
  }} catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/ShowAllOrders/:userID", auth.userAuth, async (req, res) => {
  try {
    userid=req.params.userID
    // console.log(userid)
    //    await req.user.populate({
    //        path:"userOrder"
    //    }).execPopulate()
    //    res.status(200).send(req.user.userOrder)
    // alldata = await Order.find().populate('user_id',["name","phone"])
    alldata = await Order.find({user_id:userid})
      .populate("user_id","name")
      //.populate("products_id");

      // alldata.forEach(async (_products)=>{
      //   _products.products.forEach(async (val,index)=>{
      //post = await product.findById("60d79c933e0c1f128467b2bb").populate('product');
      //     console.log(post);
      //   })        
      // })

    res.status(200).send(alldata);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/user/singleOrder/:id", auth.userAuth, async (req, res) => {
  try {
    orderID = req.params.id;
    singledata = await Order.findById({_id:orderID})
    res.status(200).send(singledata);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.delete("/user/deleteOrder/:id",auth.userAuth,async (req, res) => {
    try {
        orderId=req.params.id
        order= await Order.findByIdAndDelete({ _id:orderId })
        
         order.save()
      
  
      res.status(200).send({"Message":"Order Is Deleted"});
    } catch (e) {
      res.status(500).send({"Message":"Order Is already Deleted"});
    }
  })


  router.patch("/user/editOrder/:id", auth.userAuth, async (req, res) => {
      
    orderID = req.params.id;
    order = await Order.findById({_id:orderID})
    console.log(order)
    orderItem=Object.keys(req.body)
    allowedUpdateItems=['name','color','quantity','price','category']
    console.log(orderItem);
    isAvailableItem = orderItem.every(item => {

       return allowedUpdateItems.includes(item)
    });
    // console.log(isAvailableItem);
    
    if(!isAvailableItem){
        res.status(500).send({"Message":"this Updated Item Not Available"});
    }
    try{
    orderItem.forEach(element => {
      
// console.log(element + " "+ req.body[element]);

         order['products'][0][element] = req.body[element]
        //  order[element]=req.body[element]
        


    });
      console.log(order);
   
    await order.save()
    res.status(200).send({"Message":"order is updated successfully"});

}catch(e){
    res.send(e.message)
}
  })
module.exports = router;
