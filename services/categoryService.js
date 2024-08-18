const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require ('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatuers');

const Catergory = require("../models/categoryModel");


exports.getCategories = asyncHandler( async (req, res) => {

    const DocumentsCounts = await Catergory.countDocuments();
    const apiFeatuers = new ApiFeatures(Catergory.find(),req.query)
    .paginate(DocumentsCounts)
    .filter()
    .sort()
    .search()
    .limitFields();

    const {mongooseQuery, paginationResult} = apiFeatuers;
    const categories = await mongooseQuery;

    res.status(200).json({results: categories.length,paginationResult,  data:categories});
});


exports.getCategory = asyncHandler( async (req,res,next) => {
    const {id} = req.params;
    const category = await Catergory.findById(id)
    if(!category){
        //  res.status(404).json({massage: });
       return next(new ApiError(`category is not find ${id}`, 404));
    }
    res.status(200).json({data:category});
});

exports.createCategory = asyncHandler( async (req, res ) => {
    const  {name}= req.body;

    
     const category = await Catergory.create({
        name ,
        slug: slugify(name),
    });
     res.status(201).json({data: category});

});


exports.updateCategory =  asyncHandler (async (req, res,next) => {
    const {id} = req.params;
    const {name} = req.body;

    const category = await Catergory.findOneAndUpdate(
        {_id: id},
        {name, slug: slugify(name)},
        {new: true},
        );
        if(!category){
            return next(new ApiError(`category is not find ${id}`, 404));
           
        }
        res.status(200).json({data:category});

});


exports.deleteCategory =  asyncHandler ( async (req, res,next) => {
    const {id} = req.params;
    const category = await Catergory.findByIdAndDelete(id);
    if(!category){
        return next(new ApiError(`category is not find ${id}`, 404));
        
    }
    res.status(204).send();

});