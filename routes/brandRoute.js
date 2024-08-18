const express = require("express");
// const {param, validationResult } = require('express-validator');
const   {getBrandValidator,
     createBrandValidator,
     updatBrandValidator,
     deleteBrandValidator} = require("../utils/validators/brandValidator");


const {getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
} = require('../services/brandService');

// const subcategoryRoute = require('./subCategoryRoute');


const router = express.Router();

// router.use('/:categoryId/subcategories',subcategoryRoute);


router.
route('/')
.get(getBrands)
.post(createBrandValidator,createBrand);


router
.route('/:id')
.get(getBrandValidator,getBrand)
.put(updatBrandValidator,updateBrand)
.delete(deleteBrandValidator,deleteBrand)



module.exports = router;