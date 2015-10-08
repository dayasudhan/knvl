var mongoose = require('mongoose');
//Schema
var CustomerInfoSchema = new mongoose.Schema({
	id:String,
	address:{name:String, addressLine1:String,addressLine2:String,street:String, LandMark:String, areaName:String,city:String, zip:String, latitude:Number,longitude:Number },
    phone:Number,
    vegornonveg: String,
    speciality:String
    });

//Model
var CustomerInfoModel = mongoose.model( 'CustomerInfoSchema', CustomerInfoSchema );

module.exports = CustomerInfoModel;