const mongoose = require('mongoose');


const categoryShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provid a category name"],
    unique: [true, 'Category already exiset'],
    minlength: [3, 'Name must be  at least 3 charecter'],
    maxlenght: [32, 'Name must  be less than 32 charecter'],
},
slug: {
    type: String,
    required: true,
    lowercase: true,
    
},
image: String,
},
{timestamps: true}
);

const CatergoryModel = mongoose.model('Category', categoryShema);

module.exports = CatergoryModel;
