var mongoose = require('mongoose');
//Schema
var CoverageAreaSchema = new mongoose.Schema({
    cityName:String,
    subAreas:[{name:String}]
    });

//Model
var CoverageAreaModel = mongoose.model( 'CoverageAreaSchema', CoverageAreaSchema );

module.exports = CoverageAreaModel;