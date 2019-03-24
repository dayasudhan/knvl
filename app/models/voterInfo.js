var mongoose = require('mongoose');

    var VoterInfoSchema = new mongoose.Schema({
         username:String,
         Personalrequirements:String,
         Boothrequirements:String,
         VoterID:String,
         Name:String,
         Phone:String,
         State:String,
         LS:String,
         VS:String,
         ZP:String,
         TP:String,
         GP:String,
         FinancialStatus:String,
         Cast:String,
         Language:String,
         Party:String,
         BoothNo:String,
         BoothName:String,
         VoterListPageNo:String,
         VoterListSerialNo:String,
         FamilyMemebers:String,
         Headoffamily:String
         });
//Model
var VoterInfoModel = mongoose.model( 'VoterInfoSchema', VoterInfoSchema );

module.exports = VoterInfoModel;