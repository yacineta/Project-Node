const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require ('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatuers');


const Brand = require("../models/brandModel");

exports.getBrands = asyncHandler( async (req, res) => {
    

    const DocumentsCounts = await Brand.countDocuments();
    const apiFeatuers = new ApiFeatures(Brand.find(),req.query)
    .paginate(DocumentsCounts)
    .filter()
    .sort()
    .search()
    .limitFields();


    const {mongooseQuery, paginationResult} = apiFeatuers;
    const brands = await mongooseQuery;
    
    res.status(200).json({ results: products.length, paginationResult,data:products});


    
});


exports.getBrand = asyncHandler( async (req,res,next) => {
    const {id} = req.params;
    const brand = await Brand.findById(id)
    if(!brand){
        //  res.status(404).json({massage: });
       return next(new ApiError(`brand is not find ${id}`, 404));
    }
    res.status(200).json({data:brand});
});

exports.createBrand = asyncHandler( async (req, res ) => {
    const  {name}= req.body;

    
     const brand = await Brand.create({
        name ,
        slug: slugify(name)
    });
     res.status(201).json({data: brand});

});


exports.updateBrand =  asyncHandler (async (req, res,next) => {
    const {id} = req.params;
    const {name} = req.body;

    const brand = await Brand.findOneAndUpdate(
        {_id: id},
        {name, slug: slugify(name)},
        {new: true},
        );
        if(!brand){
            return next(new ApiError(`Brand is not find ${id}`, 404));
           
        }
        res.status(200).json({data:brand});

});


exports.deleteBrand =  asyncHandler ( async (req, res,next) => {
    const {id} = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if(!brand){
        return next(new ApiError(`Brand is not find ${id}`, 404));
        
    }
    res.status(204).send();

});