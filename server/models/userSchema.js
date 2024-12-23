const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { String } = require("mongoose/lib/schema/index");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 10,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 10,
    },
    phone: {
      type: String,
      require: true,
      unique: true, 
    },
    email: {
      type: String,
      require: true,
      unique: true, 
    },
    hashPassword: {
      type: String,
      require: true,
   
    },
    userId:{
      type:String,
      require:true,
    }
  },
  { timestamps: true }
);

userSchema.method({
  async authenticate(password ,hashPassword) {
    console.log(password);
    console.log(hashPassword);
    return await bcrypt.compare(password, hashPassword);
  },  
});
module.exports = mongoose.model("User", userSchema);
