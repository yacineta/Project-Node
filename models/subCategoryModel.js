const mongoose = require ('mongoose');


const subcategoryShema = new mongoose.Schema(
    {
    name: {
       type: String,
       trim: true,
       unique: [true, 'Subcategory already exicte'],
    //    required :[true,'Please add a sub category '],
       minlength:[2, 'ton short SubCategory name' ],
       maxlength:[32, 'ton long SubCategory name' ],
    },
    slug: {
        type: String,
        required: true,
        lowercase:true,
        
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Please add a Category'],
    },
},
{timestamps:true}
);


 module.exports= mongoose.model( 'SubCategory', subcategoryShema);



