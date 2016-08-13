var mongoose = require('mongoose');
//Schema
var CoverageAreaSchema = new mongoose.Schema({
    cityName:String,
    id:String,
    subAreas:[{name:String, isBulkAreaOnly:Number}]
    });

//Model
var CoverageAreaModel = mongoose.model( 'CoverageAreaSchema', CoverageAreaSchema );

module.exports = CoverageAreaModel;