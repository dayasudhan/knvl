var mongoose = require('mongoose');
//Schema
var StationSchema = new mongoose.Schema({
   
           circlename: String,  
           division:[{
                divisionname:String,
                subdivisionname:String,
                stationname:String
        }],
   
    });
//Model
var stationModel = mongoose.model( 'StationSchema', StationSchema );

module.exports = stationModel;