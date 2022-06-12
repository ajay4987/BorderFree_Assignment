const express = require("express");
const router = new express.Router();
const Product = require("../models/ProductScheme");


router.get('/',async function(req,res){
    try{
        const product = await Product.find()
        res.status(200).json({ Status:"Success",
        productList:product,})
    }
    catch(e){
        console.log(e)
        res.status(500).json({Status:"Error",
        Error:e.message,})
    }
})

router.get('/:id', async function(req, res){
    let id = req.params.id
    let resp = await Product.findOne({id})
    await Product.findOneAndUpdate({id},
        {imagecount:resp.imagecount+1})
    res.status(200).json({ Status:"Success"})
})

module.exports = router;