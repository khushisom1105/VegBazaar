const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
 
  image: {
    type: String,  
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'inactive' , 'Coming Soon'],  
    default: 'active'
  },

},{
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
