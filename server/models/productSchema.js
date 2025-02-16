const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to the Category model
    required: true
  },
  images: {
    type: String, 
    default:null 
  },
  // images: [{
  //   type: String,  // Array of image URLs for the product
  //   default: []
  // }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],  // Enum for product status
    default: 'active'
  },
  type_quantity:{
    type:String,
    enum:['Gram','Kilogram','Piece','Milliliter','Liter'],
    default:'Kilogram'
  },
  discount:{
    type: Number,
    default: 0
  }

},{
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
