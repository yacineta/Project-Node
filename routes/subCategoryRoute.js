const express = require("express");
const { createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdBody,
    createFilterObj
}  = require('../services/subCategoryService');
const {createSubCategoryValidator,
    getSubCategoryValidator,
    updatSubCategoryValidator,
    deleteSubCategoryValidator
} = require('../utils/validators/subCategoryValidator')

const router = express.Router({mergeParams: true});


router.
route('/')
.get(createFilterObj,getSubCategories)
.post(setCategoryIdBody,createSubCategoryValidator,createSubCategory);


router
.route('/:id')
.get(getSubCategoryValidator,getSubCategory)
.put(updatSubCategoryValidator,updateSubCategory)
.delete(deleteSubCategoryValidator,deleteSubCategory);


module.exports = router;