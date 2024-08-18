const express = require("express");
// const {param, validationResult } = require('express-validator');
const   {getCategoryValidator, createCategoryValidator,updatCategoryValidator,deleteCategoryValidator} = require("../utils/validators/categoryValidator");


const {getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../services/categoryService');

const subcategoryRoute = require('./subCategoryRoute');


const router = express.Router();

router.use('/:categoryId/subCategories',subcategoryRoute);


router.
route('/')
.get(getCategories)
.post(createCategoryValidator,createCategory);


router
.route('/:id')
.get(getCategoryValidator,getCategory)
.put(updatCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory)
;


module.exports = router;