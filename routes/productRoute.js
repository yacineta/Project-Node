const express = require("express");
// const {param, validationResult } = require('express-validator');
const   {getProductValidator,
     createProductValidator,
     updateProductValidator,
     deleteProductValidator} = require("../utils/validators/productValidator");


const {getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../services/productService');

// const subcategoryRoute = require('./subCategoryRoute');


const router = express.Router();

// router.use('/:categoryId/subcategories',subcategoryRoute);


router.
route('/')
.get(getProducts)
.post(createProductValidator,createProduct);


router
.route('/:id')
.get(getProductValidator,getProduct)
.put(updateProductValidator,updateProduct)
.delete(deleteProductValidator,deleteProduct)
;


module.exports = router;