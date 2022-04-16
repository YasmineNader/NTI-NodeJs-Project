const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const auth = require("../middleware/Auth");
const multer = require("multer");
const fs = require("fs");
var upload = multer({ dest: "public/images/" });

router.post("/admin/addProducts", auth.adminAuth,async (req, res) => {
  try {
    console.log(req)
    product = new Product(req.body);
    await product.save();
    res.status(200).send({'Message':"Product Added Successfully"});
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/admin/allProducts", auth.adminAuth, async (req, res) => {
  try {
    products = await Product.find();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.patch("/admin/editProduct/:id", auth.adminAuth, async (req, res) => {
  productID = req.params.id;
  product = await Product.findById({ _id: productID });
  updateItems = Object.keys(req.body);
  allowedItemToUpdate = ["name", "stock" , "price", "brand", "category","image"];
  isAvailable = updateItems.every((item) => allowedItemToUpdate.includes(item));
  if (!isAvailable) {
    res.status(500).send({"Message":"this Update Not Available"});
  }
  try {
    updateItems.forEach((element) => {
      product[element] = req.body[element];
    });
    await product.save();
    res.status(200).send({"Message":"Product data Is Updated"});
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/admin/deleteProduct/:id", auth.adminAuth, async (req, res) => {
  try {
    productID = req.params.id;
    product = await Product.findByIdAndDelete({ _id: productID });
    product.save();

    res.status(200).send({"Message":"Product Is Deleted"});
  } catch (e) {
    res.status(500).send({"Message":"Product Is arleady Deleted"});
  }
});

router.get("/admin/ShowSingle/:id", auth.adminAuth, async (req, res) => {
  try {
    productID = req.params.id;
    product = await Product.findById({ _id: productID });
   

    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e.message);
  }
});



router.post("/uploadImage/:id",auth.adminAuth,upload.single("profile")
,async (req, res) => {
    try {
      id = req.params.id;
      product = await Product.findById({ _id: id });
      oldPath=req.file.path
      newPath=`./public/images/${req.file.originalname}`
      // imageWithExtension = `${req.file.path}.${req.file.originalname
      //   .split(".")
      //   .pop()}`;
      // fs.rename(req.file.path, imageWithExtension, (error) => {
      //   if (error) console.log(error);
      // });
      // console.log(req.file.originalname)
      // product.image = imageWithExtension;
      fs.rename(oldPath,newPath,(error)=>{
        if (error) console.log(error);
      })
      product.image = req.file.originalname;

      await product.save();
      res.send({'Message':'image is added',"data":req.file.path});
    } catch (e) {
      res.send(e.message);
    }
  }

  
  
);

router.post("/addProduct/uploadImage",auth.adminAuth,upload.single("profile")
,async (req, res) => {
    try {
    
      oldPath=req.file.path
      newPath=`./public/images/${req.file.originalname}`
  
      fs.rename(oldPath,newPath,(error)=>{
        if (error) console.log(error);
      })
      product.image = req.file.originalname;

      await product.save();
      res.send({'Message':'image is added',"data":req.file.path});
    } catch (e) {
      res.send(e.message);
    }
  }

  
  
);

module.exports = router;
