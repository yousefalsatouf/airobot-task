const mongoose = require('mongoose');

const propSchema= new mongoose.Schema({
  info:String
})

const geometrySchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Polygon'],
      require: true
    },
    coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers
        required: true
      }
  });

  const PolygonSchema = new mongoose.Schema({
    type: {
      type: String,
    },
    properties: propSchema,
    geometry: geometrySchema
  });

 
 module.exports= mongoose.model('polygons', PolygonSchema);