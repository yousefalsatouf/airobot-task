const mongoose = require('mongoose');

const propSchema= new mongoose.Schema({
  info:String
})

const geometrySchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      require: true
    },
    coordinates: {
        type: [Number], // Array of arrays of arrays of numbers
        required: true
      }
  });

  const PointSchema = new mongoose.Schema({
    type: {
      type: String,
    },
    properties: propSchema,
    geometry: geometrySchema
  });

 
 module.exports= mongoose.model('points', PointSchema);