const mongoose = require("mongoose")
const User = require('../models/user.model')

const billSchema = new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    

    products:[{
        _id:{type:mongoose.Schema.Types.ObjectId},
        price:{type:Number},
        quantity:{type:Number},
        amount:{type:Number},
        name:{type:String},
        color:{type:String}
        
    }],
    orderStatus:{type:String},
    totalprice:{type:Number},
    
},{ timestamps: true })

const bill= new mongoose.model('bills',billSchema)

module.exports=bill