var mongoose = require('mongoose');
//Schema

var OrderSchema = new mongoose.Schema({
    info:{type_of_work:String,
          type_of_sub_work: String,
          type_of_property: String,
          size_of_property: String,
          time_to_complete_work: String,
          time_to_start_work: String,
          type_of_ownership: String},
    current_status:String,
    tracker:[{status: String,time:Date,reason:String}],
    date:Date,
    customer:{       id:String, name: String,        phone: Number,        email: String,        
        address:{addressLine1:String,addressLine2:String,street:String, 
        	LandMark:String, areaName:String,city:String, zip:String, 
        	latitude:Number,longitude:Number }
    },
    bill_value:Number,
    deliveryCharge: Number,
    totalCost:Number,
    id:String
});

//Model
var OrderModel = mongoose.model( 'Order', OrderSchema );

module.exports = OrderModel;