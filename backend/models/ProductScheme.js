const Mongoose = require("mongoose")

const productSchema = new Mongoose.Schema(
    {
"id": {type:Number},
"title": {type:String},
"price": {type:Number},
"description": {type:String},
"category": {type:String},
"image": {type:String},
"imagecount":{default:0,
    type:Number}
})

const Product = new Mongoose.model('product',productSchema)

module.exports = Product