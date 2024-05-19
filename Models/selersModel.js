const mongoose = require("mongoose");
const { ObjectId } = require("bson");

const PropertiesSchema = new mongoose.Schema({
  sellerId: { type: ObjectId, required: true },
  seller: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String }
  },
  place: {
    type: String,
    
  },
  area: {
    type: String,
    
  },
  numberOfBedRooms: {
    type: Number,
    
  },
  numberOfBathRooms: {
    type: Number,
    
  },
  price: {
    type: Number,
    
  },
  numberOfHospitals: {
    type: String,
    
  },
  numberOfColleges: {
    type: String,
    
  },
  Likes :{
    type:Number,
    default:0
  }
});

const properties = mongoose.model("properties", PropertiesSchema);
module.exports = properties;
