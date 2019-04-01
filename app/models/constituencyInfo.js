var mongoose = require('mongoose');
//Schema
var ConstituencySchema = new mongoose.Schema({
	state:String,
    lokasabha:[{name:String, 
                vidhanasabha:[{name:String, 
                               zp:[{name:String,
                                    tp:[{name:String,
                                        gp:[{name:String}]
                                    }]
                            }]
                  }] 
              }]   
});

//Model
var ConstituencyModel = mongoose.model( 'constituency', ConstituencySchema );

module.exports = ConstituencyModel;