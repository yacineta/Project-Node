const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require ('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatuers');

const Product = require("../models/productModel");

exports.getProducts = asyncHandler( async (req, res) => {

    const DocumentsCounts = await Product.countDocuments();
    const apiFeatuers = new ApiFeatures(Product.find(),req.query)
    .paginate(DocumentsCounts)
    .filter()
    .sort()
    .search('Products')
    .limitFields();
   

    const {mongooseQuery, paginationResult} = apiFeatuers;
    const products = await mongooseQuery;
    res.status(200).json({results: products.length, paginationResult,data:products});

});


exports.getProduct = asyncHandler( async (req,res,next) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate({
        pathe:'category',
        select: 'name - _id',
    })
    if(!product){
        //  res.status(404).json({massage: });
       return next(new ApiError(`Product is not find ${id}`, 404));
    }
    res.status(200).json({data:product});
});

exports.createProduct = asyncHandler( async (req, res ) => {
    req.body.slug = slugify(req.body.title);

     const product = await Product.create(req.body);
     res.status(201).json({data: product});

});


exports.updateProduct =  asyncHandler (async (req, res,next) => {
    const {id} = req.params;
    if(req.body.title) {
         req.body.slug = slugify(req.body.titel);
    }
   

    const product = await Product.findOneAndUpdate(
        {_id: id},
        req.body,
        {new: true},
        );
        if(!product){
            return next(new ApiError(`Product is not find ${id}`, 404));
           
        }
        res.status(200).json({data:product});

});


exports.deleteProduct =  asyncHandler ( async (req, res,next) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return next(new ApiError(`Product is not find ${id}`, 404));
        
    }
    res.status(204).send();

});