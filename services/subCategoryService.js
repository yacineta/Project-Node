const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require ('../utils/apiError');


const SubCatergory = require("../models/subCategoryModel");
const subCategoryModel = require('../models/subCategoryModel');
const ApiFeatures = require('../utils/apiFeatuers');

exports.setCategoryIdBody = (req,res,next) => {
 if(!req.body.category) req.body.category = req.params.categoryId;
 next();
}



exports.createSubCategory = asyncHandler( async (req, res ) => {
   
    const  {name,catergory}= req.body ;
     const subcatergory = await SubCatergory.create({
        name ,
        slug: slugify(req.body.name),
        catergory,
         
    });
     res.status(201).json({data:subcatergory}); 
    
});

exports.createFilterObj = (req, res, next) => {

       let filterObject = {};
        if (req.params.category) filterObject = {category : req.params.categoryId};
        req.filterObj = filterObject;
        next();
};

exports.getSubCategories = asyncHandler( async (req, res) => {

    const DocumentsCounts = await SubCatergory.countDocuments();
    const apiFeatuers = new ApiFeatures(SubCatergory.find(),req.query)
    .paginate(DocumentsCounts)
    .filter()
    .sort()
    .search()
    .limitFields();

    const {mongooseQuery, paginationResult} = apiFeatuers;
    const subCategories = await mongooseQuery;

    res.status(200)
    .json({results: subCategories.length,paginationResult,  data:subCategories});
});


exports.getSubCategory = asyncHandler( async (req,res,next) => {
    const {id} = req.params;
    const subCatergory = await SubCatergory .findById(id)
    // .populate({
    //     path:'category', 
    //     select:'name - _id'});
    if(!subCatergory){
        //  res.status(404).json({massage: });
       return next(new ApiError(`category is not find ${id}`, 404));
    }
    res.status(200).json({data:subCatergory});
});


exports.updateSubCategory =  asyncHandler (async (req, res,next) => {
    const {id} = req.params;
    const {name,category} = req.body;

    const subCategory = await SubCatergory.findOneAndUpdate(
        {_id: id},
        {name, slug: slugify(name), category},
        {new: true},
        );
        if(!subCategory){
            return next(new ApiError(` No SubCategory is not find ${id}`, 404));
           
        }
        res.status(200).json({data:subCategory});
});


exports.deleteSubCategory =  asyncHandler ( async (req, res,next) => {
    const {id} = req.params;
    const subCategory = await SubCatergory.findByIdAndDelete(id);
    if(!subCategory){
        return next(new ApiError(`Subcategory is not find ${id}`, 404));
        
    }
    res.status(204).send();

});

