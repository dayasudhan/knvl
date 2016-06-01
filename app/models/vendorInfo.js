var mongoose = require('mongoose');
//Schema
var VendorInfoSchema = new mongoose.Schema({
	hotel:{name:String,email: String,logo:String,id:String},
    menu:[{name: String,  price:Number, availability:Number}],
    address:{addressLine1:String,addressLine2:String,street:String, LandMark:String, areaName:String,city:String, zip:String, latitude:Number,longitude:Number },
    phone:Number,
    vegornoveg: String,
    speciality:String,
    deliverRange: Number,
    deliverAreas:[{name:String}],
    deliverCharge:Number,
    deliveryTime:Number,
    minimumOrder:Number,
    rating:Number,
    orderAcceptTimings:{Morning:{startTime:String,endTime:String,available:String},
                        Lunch:{startTime:String,endTime:String,available:String},
                        Dinner:{startTime:String,endTime:String,available:String}
                            }
    });

//Model
var VendorInfoModel = mongoose.model( 'VendorInfoSchema', VendorInfoSchema );

module.exports = VendorInfoModel;