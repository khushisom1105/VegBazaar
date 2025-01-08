  
  const mongoose = require('mongoose');
  
  const productListSchema = new mongoose.Schema({
   
    stockQuantity: {
      type: Number,
      required: true,
      min: 0
    },
    validity: { 
        type: Number,
        required: true,
        min: 0
      },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // Reference to the Category model
      required: true
    }
  
  },{
    timestamps: true
  });
  
  const ProductList = mongoose.model('ProductList', productListSchema);
  
  module.exports = ProductList;
  


