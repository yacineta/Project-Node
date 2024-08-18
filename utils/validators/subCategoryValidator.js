const {check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID'),
    validatorMiddleware,
];

exports.createSubCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({min: 2})
    .withMessage('Too short Subcategory name') 
    .isLength({max: 32})
    .withMessage('Too long Subcategory name'),
    check('category')
    .notEmpty().
    withMessage('subCategory must be belong to category')
    .isMongoId()
    .withMessage('Invalid Category id  fromat'), 
    validatorMiddleware,
];

exports.updatSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID'),
    validatorMiddleware,

];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID'),
    validatorMiddleware,

];