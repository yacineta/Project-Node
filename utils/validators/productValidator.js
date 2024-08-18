const {check, Result} = require('express-validator');
const validatorMiddlewar = require ('../../middlewares/validatorMiddleware');

const Category = require ('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');
const { getSubCategories } = require('../../services/subCategoryService');


exports.createProductValidator = [
    check('title')
     .isLength({min:5})
     .withMessage('must be at least 5chars')
     .notEmpty()
     .withMessage('c ant be empty'),
     check('description')
     .notEmpty()
     .withMessage( 'can not be empty')
     .isLength({max:2000})
     .withMessage('Too long description'),
     check('quantity')
     .notEmpty()
     .withMessage('Can t be empty')
     .isNumeric()
     .withMessage('Must be a Number'),
     check('sold')
     .optional()
     .isNumeric()
     .withMessage('Must be Number'),
     check('price')
     .notEmpty()
     .withMessage( 'Price can t be empty')
     .isNumeric()
     .withMessage('Must be Number')
     .isLength({max:32})
     .withMessage('Price is too long'),
     check('priceAfterDiscount')
     .optional()
     .isNumeric()
     .toFloat()
     .withMessage('Must be Numeric')
     .custom((value, {req}) => {
        if (req.body < value) {
            throw new Error ('priceAfterDiscount must  be less  than Price');
        }
        return true;
     }),

     check('Colors')
     .optional()
     .isArray()
     .withMessage('Must be Array'),
     check().notEmpty()
     .withMessage(' must  not be empty'),
     check('images')
     .optional()
     .isArray()
     .withMessage('Images must be Aryya'),
     check('category')
     .notEmpty()
     .withMessage('Category filled can t be is not empty')
     .isMongoId()
     .withMessage( 'Invalid  Category Id ')
     .custom((categoryId) => Category.findById(categoryId).then((category) => {
        if(!category) {
            return Promise.reject(
                new Error(`No category for this id : ${categoryId}`)
            );
        }
     })

      ),
     check('subcCategories')
     .optional()
     .isMongoId()
     .withMessage('Invalid SubCategory Id')
    .custom((subcategoriesIds) => SubCategory.find({_id:{$exests: true , $in:subcategoriesIds}})
    .then((Result) => {
         if(Result.length < 1 || Result.length !== subcategoriesIds.length){
            return Promise.reject(new Error(`Som Invalid SubCategory Id`));

         };
    })
    ).custom((val, {req}) =>
    SubCategory.find({category: req.body.category}).then(
        (subcategories) => {
            // console.log(subcategoris);
            const subCategoriesIdsInDB = [];
            subcategories.forEach((subCategory) =>{
                subCategoriesIdsInDB.push(subCategory._id.toString());
            });
            const checker = (target, arr) => target.every((v =>arr.includes(v)))

             if(!checker(val,subCategoriesIdsInDB)){
                return Promise.reject(new Error(` SubCategory not belong to category `));
             }
    }
    )
    ),
     check('Brand').optional().isMongoId().withMessage('Invalid Brand Ids'),
     check('ratingsAverage')
     .optional()
     .isNumeric()
     .withMessage('Rating must be Nemuric')
     .isLength({min:1})
     .withMessage('Rating filed can t be Empty')
     .isLength({ma:10})
     .withMessage('Rating must be less than 10'),
     check('ratingsQuantity')
     .optional()
     .isNumeric()
     .withMessage('Ratings Quantity must Be numeric'),
     validatorMiddlewar,
];

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid Id'),
    validatorMiddlewar,
];
exports.updateProductValidator  = [
    check('id').isMongoId().withMessage('invalid Id'),
    validatorMiddlewar,
];

exports.deleteProductValidator  = [
    check('id').isMongoId().withMessage('invalid Id'),
    validatorMiddlewar,
];


