const mongoose = require('mongoose');


const brandShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provid a brand name"],
    unique: [true, 'brand already exiset'],
    minlength: [3, 'Name must be  at least 3 charecter'],
    maxlenght: [32, 'Name must  be less than 32 charecter'],
},
slug: {
    type: String,
    lowercase: true,
},
image: String,
},
{timestamps: true}
);

module.exports = mongoose.model('Brand', brandShema);


