var OrderModel = require('../app/models/vendorOrder');
var VendorInfoModel = require('../app/models/vendorInfo');
var CustomerInfoModel = require('../app/models/customerInfo');
var Account = require('../app/models/account');
module.exports = function(app, passport) {



// normal routes ===============================================================

// show the home page (will also have our login links)
app.get('/test', function(req, res) {
    res.render('index.ejs');
});

app.get('/', function (req, res) {
    if(req.isAuthenticated())
        res.render('customer', { user : req.user });
    else
        res.render('customer', { user : "dummy" });
});

// app.get('/p/customer_menu', function (req, res) {
//     if(req.isAuthenticated())
//         res.render('customer_menu', { user : req.user });
//     else
//         res.render('customer_menu', { user : "dummy" });
// });

// PROFILE SECTION =========================
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    });
});

// LOGOUT ==============================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/test', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });





app.get('/p/vendor2', function (req, res) {
    res.render('vendor_order', { user : req.user });
});

app.get('/p/vendor3', function (req, res) {
    res.render('index3', { user : req.user });
});


app.get('/p/vendor_order', function (req, res) {
    res.render('vendor_order', { user : req.user });
});

app.get('/p/vendor_summary', function (req, res) {
    res.render('vendor_order_summary', { user : req.user });
});

app.get('/p/vendor_menu', function (req, res) {
    res.render('vendor_menu', { user : req.user });
});

app.get('/p/vendor_details', function (req, res) {
    res.render('vendor_details', { user : req.user });
});


app.get('/p/signin', function (req, res) {
    res.render('starter', { user : req.user });
});

app.get('/p/register', function(req, res) {
    res.render('register2', { });
});



app.get('/vendor', function (req, res) {
    res.render('index', { user : req.user });
});
app.get('/', function (req, res) {
    res.render('customer', { user : req.user });
});

app.get('/menu', function (req, res) {
    res.render('menu', { user : req.user });
});

app.get('/register', function(req, res) {
    res.render('register', { });
});

app.get('/orders', function (req, res) {
    res.render('invoice_list', { user : req.user });
});

app.get('/order_summary', function (req, res) {
    res.render('order_summary', { user : req.user });
});

app.get('/menus', function (req, res) {
    res.render('menu_list', { user : req.user });
});

app.get('/about_us', function (req, res) {
    res.render('about_us', { user : req.user });
});

// app.post('/register', function(req, res, next) {
//   console.log(req.body.City);
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//           return res.render("register", {info: "Sorry. That username already exists. Try again."});
//         }
//           console.log("aunthiticate 1");
//           storeVendorInfo(req,res,function(req,res){
//            console.log("aunthiticate 2");
//         passport.authenticate('local')(req, res, function () {

//             req.session.save(function (err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 res.redirect('/orders');
//             });
//         });
//       });
//     });
// });
app.post('/register', function(req, res, next) {
  console.log("/register post method");
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          console.log("error register post method");
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }
          console.log("aunthiticate 1");
           var vendorInfo = new VendorInfoModel({
        hotel:{email:req.body.username}
      });
      vendorInfo.save( function( err ) {
        if( !err ) {
              console.log( 'storeVendorInfo created' );
              console.log(req.body.username);
              passport.authenticate('local')(req, res, function () {
                  req.session.save(function (err) {
                    if (err) {
                      return next(err);
                    }
                    res.redirect('/p/vendor_details');
                  });
              });
              return ;
              } else {
                console.log( 'storeVendorInfo error' );
                console.log( err );
                return response.send('ERROR');
              }
        });
    });
});
app.post( '/v1/vendor/info/:id', function( req, res ) {

   console.log("VendorInfo post");
  console.log(req.body.Name);
            storeVendorInfo(req,res,function(req,res){
           console.log("storeVendorInfo success");
           console.log(res);
        });

  });
function storeVendorInfo(request,response,callback,param)
{
console.log("storeVendorInfo");
console.log(request.params.id);
 VendorInfoModel.update({ 'hotel.email':request.params.id},
      {
        hotel:{name:request.body.Name,email:request.params.id},
       address:{addressLine1:request.body.Address1,addressLine2:request.body.Address2,
        street:request.body.street, LandMark:request.body.Landmark, 
        areaName:request.body.Areaname,city:request.body.City, zip:request.body.zip, 
        latitude:request.body.latitude,longitude:request.body.longitude },
        phone:request.body.phone ,
        logo:request.body.logo,
        speciality:request.body.speciality,
        vegornonveg:request.body.vegornonveg,
        deliverRange: request.body.deliverrange
        //deliverAreas:request.body.deliverareas
      },
       function( err ) {
        if( !err ) {
            console.log( 'storeVendorInfo created' );
            callback(request,response);
            return ;
        } else {
         console.log( 'storeVendorInfo error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
}


app.get('/old/login', function(req, res) {
    res.render('login', { user : req.user });
});

app.post('/old/login', passport.authenticate('local'), function(req, res, next) {
    req.session.save(function (err) {
    
        if (err) {
            return next(err);
        }
       // res.redirect('/orders');
       res.redirect('/p/vendor_order');
    });
});
app.post('/m/login', passport.authenticate('local'), function(req, res, next) {

    req.session.save(function (err) {
        
      
        if (err) {
          var err_response = {
                        tag: "login",
                        status: false,
                        error_msg: "Incorrect Email or Password"
                        };
            res.send(err_response);
        }
        var suc_response = {
                        tag: "login",
                        status: true
                        };
        res.send(suc_response);
    });
});

app.get('/old/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/p/signin');
    });
});

app.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

app.get( '/v1/vendor/test', function( request, response ) {
   
            return response.send( "vendor" );
   });

app.get( '/v1/vendor/city/:id', function( request, response ) {
    return VendorInfoModel.find({ 'address.city':request.params.id},function( err, vendor ) {
        if( !err ) {
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.get( '/v1/vendor/account/all', function( request, response ) {
    return VendorInfoModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/vendor/account/:id', function( request, response ) {
  // OrderModel.findById( request.params.id, function( err, book ) 
     console.log("dasd");
  console.log(request.params.id);
   // return OrderModel.find({ customer:{email:'daya@gmail.com'}},function( err, order ) {
     return VendorInfoModel.find({ 'hotel.email':request.params.id},function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});
app.get( '/v1/customer', function( request, response ) {
    console.log(request.user.local);
     console.log(request.user.local.email);
  
     return CustomerInfoModel.find({ 'id':request.user.local.email},function( err, customerInfo ) {
        if( !err ) {
            return response.send( customerInfo );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});
app.post( '/v1/customer/:id', function( request, response ) {

console.log(request.body);

return CustomerInfoModel.findOneAndUpdate({ 'id':request.params.id},

        {
                id:request.params.id,
                phone:request.body.phone,
                vegornonveg:"veg",
                speciality:"",
               address:{addressLine1:request.body.Address1,addressLine2:request.body.Address2,
                street:request.body.street, LandMark:request.body.Landmark, 
                areaName:request.body.Areaname,city:request.body.City, zip:request.body.zip, 
                latitude:request.body.latitude,longitude:request.body.longitude }
            },
           

    function( err,customer ) {
        if( !err ) {
                if(customer == null)
                {
                    console.log( "empty" );
                                        var customer = new CustomerInfoModel({
                        id:request.params.id,
                        phone:request.body.phone,
                        vegornonveg:"veg",
                        speciality:"",
                       address:{addressLine1:request.body.Address1,addressLine2:request.body.Address2,
                        street:request.body.street, LandMark:request.body.Landmark, 
                        areaName:request.body.Areaname,city:request.body.City, zip:request.body.zip, 
                        latitude:request.body.latitude,longitude:request.body.longitude }
                    });
                 
                    console.log(request.body);
                    customer.save( function( err ) {
                        if( !err ) {
                            console.log( 'created' );
                            return response.send( customer );
                        } else {
                         console.log( 'error' );
                            console.log( err );
                            return response.send('ERROR');
                        }
                    });
                   
                }
                
                    return  response.send(customer);
               
            

        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });

});



app.get( '/v1/vendor/order/:id', function( request, response ) {
  console.log(request.params.id);
     return OrderModel.find({ 'hotel.email':request.params.id},function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});
//unregister a book
app.delete( '/v1/vendor/order/:id', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return OrderModel.remove( { 'hotel.email':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'orders removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});
app.get( '/v1/vendor/order/all', function( request, response ) {
    return OrderModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.post( '/v1/vendor/order', function( request, response ) {

console.log(request.body);

console.log( request.body.hotel.name);
    var order = new OrderModel({
        hotel:request.body.hotel,
        customer: {name: request.body.customer.name, email: request.body.customer.email, phone: request.body.customer.phone,  Address: "daya"},
        menu: request.body.menu       });
 
    console.log(request.body);
    order.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( order );
        } else {
         console.log( 'error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.get( '/v1/vendor/order/summary', function( req, res ) {
   OrderModel.aggregate(
   {$group:{_id: '$menu.name',total:{$sum :'$menu.no_of_order'}}},
      function (err, summary) {
        console.log("k1");
        if(err){
  console.log("k12");
            return res.send(500, { error: err }); 
        }

        if(summary) {
              console.log("k13");
            return res.send(summary);
        } else {
              console.log("k14");
            res.send(500, { error: 'couldnt find expenses' }); 
        }
          console.log("k15");
    }
    )
});

app.get( '/v1/vendor/order/summary/:id', function( request, res ) {
   OrderModel.aggregate(
   [
    {$match: { 'hotel.email': request.params.id } },
    {$group:{_id: '$menu.name',total:{$sum :'$menu.no_of_order'}}}
   ],
      function (err, summary) {
        console.log("k1");
        if(err){
  console.log("k12");
            return res.send(500, { error: err }); 
        }

        if(summary) {
              console.log("k13");
            return res.send(summary);
        } else {
              console.log("k14");
            res.send(500, { error: 'couldnt find expenses' }); 
        }
          console.log("k15");
    }
    )
});

app.post( '/v1/vendor/list2', function( request, response ) {

    // var order = new OrderModel({
    //     customer: {name: request.body.name, email: request.body.email, phone: request.body.phone,  Address: "daya"},
    //     menu:{name: request.body.menu, no_of_order: request.body.no_of_order }       });
     var order = new OrderModel({
        customer: {name: "daya", email: "daya@gmail.com", phone: 1234,  Address: "daya"},
        menu:{name:" request.body.menu", no_of_order: 123 }       });

    console.log(request.body);
    order.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( order );
        } else {
         console.log( 'error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Delete a book
app.delete( '/v1/vendor/list', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return OrderModel.remove( {},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});




app.post( '/v1/vendor/menu/:id', function( request, response ) {
  // OrderModel.findById( request.params.id, function( err, book ) 
     console.log("post /vendor/menu/");
     console.log(request.body);
  console.log(request.params.id);

     return VendorInfoModel.update({ 'hotel.email':request.params.id},{ $addToSet: {menu: {$each:[{name: request.body.fooditem,  price:request.body.foodprice,availability:1}] }}},function( err, order ) {
        if( !err ) {
            console.log("no error");
            console.log(order);
            //return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});

app.get( '/v1/vendor/menu/:id', function( request, response ) {
  // OrderModel.findById( request.params.id, function( err, book ) 
     console.log("get /vendor/menu/");
  console.log(request.params.id);
   // return OrderModel.find({ customer:{email:'daya@gmail.com'}},function( err, order ) {
     return VendorInfoModel.find({ 'hotel.email':request.params.id},function( err, vendorinfo ) {
        if( !err ) {
             console.log("no error");
            if(vendorinfo.length > 0)
              return response.send( vendorinfo[0].menu );
            else
              return response.send( vendorinfo );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});

//unregister a book
app.delete( '/v1/vendor/unregister/:id', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return VendorInfoModel.remove( { 'hotel.email':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});

//Delete a menu item
app.delete( '/v1/vendor/menu/item/:id', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return VendorInfoModel.update( { 'hotel.email':request.params.id},{ $pull: {menu: {"name": request.body.fooditem }}},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}







//module.exports = router;