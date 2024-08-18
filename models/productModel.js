const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trime: true,
        minLength: [5,' Title must  be  at 2 last cracetre'],
        maxlength: [500,' Title must  be  at 50 last cracetre']
    },
    sluge: {
        type: String,
        required: true,
        lowercase:true,
    },
    description: {
        type: String,
        required: [true,'Product description is required'],
        minLength:[10, 'too short descrption'],
    },
    quantity:{
        type:Number,
        required:[true,'Product  Qauntity is required'],
    },
    sold:{
        type: Number,
        default: 0,
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
        trime:true,
        max:[300000,'Too long Product price'],

    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    imageCover: {
        type:String,
        required: [true,'Image cover is required'],

    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Please provid a category'],
    },
    subcategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref:'SubCategory'
        },
    ],
    brand: {
        type:mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    ratingsAverage: {
        type: Number,
        min:[1, 'Rating must be above or equal 1.0'],
        max:[5,'Rating must be below or equal 5.0'],
    },
    ratingsQuantity: {
        type:Number,
        default:0,
    },


},
{timestamps:true}
);

module.exports = mongoose.model('Product',productSchema);