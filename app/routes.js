
var OrderModel = require('../app/models/vendorOrder');
var VendorInfoModel = require('../app/models/vendorInfo');
var CustomerInfoModel = require('../app/models/customerInfo');
var CoverageAreaModel = require('../app/models/coverageArea');
var CountersModel = require('../app/models/counters');
var OtpModel = require('../app/models/otp');
var Firebase = require("firebase");
var multer = require('multer');
var path = require('path');
var Client = require('node-rest-client').Client;
var client = new Client();
var options = multer.diskStorage({ destination : 'public/images/logo/' ,
  filename: function (req, file, cb) {
    cb(null, req.params.id + path.extname(file.originalname));
  }
});
var upload = multer({ storage: options });

Firebase.initializeApp({
  serviceAccount: {
  "type": "service_account",
  "project_id": "project-8598805513533999178",
  "private_key_id": "82abba7994a0894b4b38ee0c66d05cf80dd99efc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCGKNGc8VwvoTrX\njusnjmbMAmjTjBJ/2Tu/gzktQxfoY0mIe31NUufw0mnBQYOJakU1FORvw8USn3QM\nNCu8h1UvfhvkUVI/FjAdEcuBh+PFOULqFWYlalK3560qvGlE6xHnftgLQC/LI9R4\nmO0moRLBrQ2Oq2JVUwIE58xiXgw5WyMxnZ4IS1kons5UmutUw3QtRMfvwLHrkV/z\na8oP6XPXeECp7FWrvtF53PYFLRurL1bFQsSNwHFw8su8BhEhjpXXD1SDKyEpnz4E\nr8P2wTS1116mrVkNXWyY0rV7fyBvqeh/oH0AZVOzDCueFkT3Q2eZJcGUnGp9uTCb\nExXNIws/AgMBAAECggEAST2LgYR6cT4x43AQjJ2/HOzL0YGMr+MmLR00X7NbH/Dk\nOfBAra/vE5erSGe9qY0sjxgCxck4kzwdnHP21IuFQ9Iy4+hJYEt6pMQMN4C6Jfdm\nwmhARXjQA7ok3UnSpl82fQzQYQP/k4TR/6xs+0O/+5+/4P1LR41zcr4g5Cq3va9l\n4W37dOgaYCUSprWXFQtD5kztcOYNeyuPGg7IYIL/xBo8mqaH49wAf1SureSJauKK\ndEc8hq4FuR9VAWlISV4GBZ4w6DL+N2KrOFbwBiqbt6IASoh7p6k2H+beExmKCpeG\nUDORBsuMRNsYFvQDmS8q6XwYjX4TVh/Agp7jv+DaEQKBgQDorbsL+f+/GZQQ1+ds\nSMQdhvOLXpO8Oh7eAjTTY3K/UNTKCkEoTkam51Bv4O4b/qIXKbcqRyTfqbW9e/mb\nuY0SK/+2N0XTo3X71jJDRKE+Zls1j2/slaDeiUzRxXIF+J0SIgEV5hPbEGNYdGuK\niDP0Mr82GQ998kyKcMBIqG8yZQKBgQCTmzKhmt7GmwCWnxZlvc1yB1nII2r+L1CT\nVQudMgNyWLAF3XtVXC6mntGhEdzcygvB/AOwusMI60duCgZK/+x0JNdyLKvFkmeT\nh4djfppGSjwtzzW1geBgJQnyWdoBv/q6Z68Ms3NSexTODbfC2qfBpR27oECZr4Hz\n7P45S+Fa0wKBgDfBKYj9JuNL5ccDdVjlNtk8dS94Qj5gTvUz4iSlN+HQJK0lN+fI\nmfV0iDnG1EexBHY4cMOYuKU/rWTySCWgmMU59dRb+kd0a9kkwnaMA3dIX6K99Dvk\nvt+UVuwNO/1iTYEC1O/Cag+cJbIUc5CGgqyJXHhCGQw8+0pRKkI+2iZhAoGAD5Qw\nyteyrZmMfVk7Hu/icCeQdUwvrbZGtdYjDKtLq9TqdyQCMWcyUUmv7GUbP35fsVCs\n/wknLpjOiDGsqlvKlBOTXayTUJ38KpkCVCD3nXWWVmtpSsfza5JdM2QCW27swqHQ\n2vFRuaHd90WBYKJ9VDXeJoBqcQ4SFDGuP1Pf7BsCgYEA0bVl9WMaIAe8V6AtwYjz\nLx1KRQ3mZWwXdEBitciQhnDeutMgaExkwCJHag6VGfOljNe/JtgCEzqWWh0rvFzi\nUn2WZA/kcqByHIQzVqJwhFkVjRzS5/qVrTvZw0xu2HVQD4iV6OHRMS3TeIUbGqOK\ngFYR4uhQAX6sXvXp4uU16bs=\n-----END PRIVATE KEY-----\n",
  "client_email": "khaanavali@project-8598805513533999178.iam.gserviceaccount.com",
  "client_id": "110281937967415310229",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/khaanavali%40project-8598805513533999178.iam.gserviceaccount.com"
},
  databaseURL: "https://project-8598805513533999178.firebaseio.com"
});


var rootRef = Firebase.database().ref();


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
  
  var redirect_url = '/';
    req.logout();
    res.redirect(redirect_url);
});

app.get('/vendor_logout', function(req, res) {
    var redirect_url = '/vendor';
    req.logout();
    res.redirect(redirect_url);
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
        // app.post('/login', passport.authenticate('local-login', {
        //     successRedirect : '/', // redirect to the secure profile section
        //     failureRedirect : '/login', // redirect back to the signup page if there is an error
        //     failureFlash : true // allow flash messages
        // }));

app.post('/v1/m/login', function(req, res, next) {
    console.log('post /v1/m/login');
     console.log(req.body);
  passport.authenticate('local-login', function(err, user, info) {
   
    if (err) {console.log('post /v1/m/login  1');return next(err); }
    if (!user) {
        console.log('post /v1/m/login  2');
             return res.send("0"); 
    }
    req.logIn(user, function(err) {
        console.log('post /v1/m/login  3');
      if (err) {
      console.log('post /v1/m/login 4'); 
      

        return next(err); }
       console.log("store the uniqui id") 
              storeVendoruniqueId(req,res,function(req,res){
           console.log("storeVendoruniqueId success");
           
        });
      return res.send("1");
    });
    console.log('post /v1/m/login 5');
  })(req, res, next);
});




app.post('/login', function(req, res, next) {
    console.log('post /login');
      console.log(req.body);
  passport.authenticate('local-login', function(err, user, info) {
   
    if (err) { return next(err); }
    if (!user) {
         var redirect_url = '/';
            if(req.body.role == 'customer')
            {
                redirect_url = '/signup';
            }
            else if(req.body.role == 'vendor') 
            {
                redirect_url = '/p/vendor_signup';
            } 
            return res.redirect(redirect_url); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log(req.body.role);
      var redirect_url = '/';
      if(req.body.role == 'customer')
      {
        redirect_url = '/';
      }
       else if(req.body.role == 'vendor') 
       {
        redirect_url = '/p/vendor_details';
       }
      return res.redirect(redirect_url);
    });
  })(req, res, next);
});
        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('customer_signup.ejs', { message: req.flash('signupMessage') });
        });

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

app.get('/vendor', function (req, res) {
    res.render('vendor_login', { user : req.user });
});
app.get('/', function (req, res) {
    res.render('customer', { user : req.user });
});

app.get('/p/vendor_order', function (req, res) {
    console.log(req.user);
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


app.get('/p/vendor_login', function (req, res) {
    res.render('vendor_login', { user : req.user });
});

app.get('/p/vendor_signup', function(req, res) {
    res.render('vendor_signup', { });
});

app.get('/about_us', function (req, res) {
    res.render('about_us', { user : req.user });
});

app.get('/admin', function (req, res) {
    res.render('admin_login', { user : req.user });
});

app.get('/p/admin_order', function (req, res) {
    console.log(req.user);
    res.render('admin_order', { user : req.user });
});


app.post('/signup', function(req, res, next) {

  passport.authenticate('local-signup', function(err, user, info) {
   console.log(req.body);
    if (err) { return next(err); }
    if (!user) { 
        var redirect_url = '/';
            if(req.body.role == 'customer')
            {
                redirect_url = '/signup';
            }
            else if(req.body.role == 'vendor') 
            {
                redirect_url = '/p/vendor_signup';
            } 
            return res.redirect(redirect_url); 
     }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log(req.body.role);
      var redirect_url;
      if(req.body.role == 'customer')
        redirect_url = '/';
       else if(req.body.role == 'vendor') 
       {
        redirect_url = '/p/vendor_details';
        registerVendor(req, res, next);
        }
      return res.redirect(redirect_url);
    });
  })(req, res, next);
});

function registerVendor(req, res, next) {
  console.log("/registerVendor");
  var hotel_id = "H";
  var res = getNextSequence('hotel',function(data) {

    hotel_id = hotel_id + data.sequence;
    console.log(hotel_id);

      var vendorInfo = new VendorInfoModel({
        hotel:{email:req.body.email,id:hotel_id}
      });
      vendorInfo.save( function( err ) {
        if( !err ) {
              console.log( 'registerVendor created' );
              console.log(req.body.email);
                  req.session.save(function (err) {
                    if (err) {
                        console.log( 'registerVendor save error' );
                      return next(err);
                    }
                    console.log( 'registerVendor save complete' );
                  });
              return ;
              } else {
                console.log( 'registerVendor error' );
                console.log( err );
                return response.send('ERROR');
              }
        });
    });
};

app.get( '/v1/vendor/info/:id', function( request, response ) {
    console.log("GET --/v1/vendor/info/");
    return VendorInfoModel.find({ 'hotel.email':request.params.id},function( err, vendor ) {
        if( !err ) {
            console.log(vendor);
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.post( '/v1/vendor/logo/:id', upload.single('file'),function( req, res ) {
  console.log(req.params.id);
  console.log(req.files);
  console.log(req.file);
  console.log(req.file.path);
  console.log("VendorLogo post");
  console.log(req.body);
  VendorInfoModel.update({ 'hotel.id':req.params.id},
      {
        $set: { "hotel.logo": req.file.path } ,
       
      },
       function( err ) {
        if( !err ) {
            console.log( 'updated logo created' );
           
            return res.send('created');;
        } else {
         console.log( 'updated logo error' );
            console.log( err );
            return res.send('ERROR');
        }
    });
});

app.post( '/v1/vendor/isopen/:id', function( req, res ) {
  console.log('/v1/vendor/isopen/:id');
  console.log(req.params.id);
 console.log(req.body.isopen);
  var isopen = parseInt(req.body.isopen);
  console.log(isopen);
  VendorInfoModel.update({ 'hotel.email':req.params.id},
      {
        $set: { isOpen: isopen } 
      },
       function( err ) {
        if( !err ) {
            console.log( 'updated isopen created' );
           
            return res.send('created');;
        } else {
         console.log( 'updated logo isopen' );
            console.log( err );
            return res.send('ERROR');
        }
    });
});

app.post( '/v1/vendor/review/:id', function( req, res ) {
  console.log('/v1/vendor/review/:id');
  console.log(req.params.id);
  console.log(req.body.rating);
  console.log(req.body.reviewcomment);
  VendorInfoModel.update({ 'hotel.id':req.params.id},
      {
        
      },
       function( err ) {
        if( !err ) {
            console.log( 'updated vendor review created' );
           
            return res.send('created');;
        } else {
         console.log( 'updated vendor review created' );
            console.log( err );
            return res.send('ERROR');
        }
    });
});

app.post( '/v1/vendor/otp/register', function( req, res ) {
    console.log('/v1/vendor/otp/register');
   
    console.log(req.body.phoneNumber);
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.deviceId);
    var otpnum = Math.random() * (9999 - 1000) + 1000;
    otpnum = Math.round(otpnum);
    console.log(req.body.phoneNumber);
     return OtpModel.findOneAndUpdate({ '_id':req.body.phoneNumber},
                { otpnumber:otpnum },
      function( err,otp ) {
            if( !err ) 
            {
                console.log( 'otp created' );
                console.log(otp);
                var otpurl = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=mhgGNz6lk0ytziomd49mcQ&senderid=WEBSMS&channel=2&DCS=0&flashsms=0&route=1";
                //&number=919566229075&text=test message";
                otpurl  = otpurl + "&number=" +  req.body.phoneNumber;
                otpurl  = otpurl + "&text=" +  "Your one time password for khaanavali is : " + otpnum;
                console.log(otpurl);
                client.get(otpurl, 
                function (data, response) {
                    console.log(data);
                    return res.send("Success");
                });
              return res.send("Success");
            } 
            else 
            {
                  console.log( 'error' );
                  console.log( err );
                  return res.send('ERROR');
              }
            });

});

app.post( '/v1/vendor/otp/confirm', function( req, res ) {
    console.log('/v1/vendor/otp/confirm');
    console.log(req.body.phoneNumber);
    console.log(req.body.otpText);
    
    return OtpModel.find({ '_id':req.body.phoneNumber},function( err, otpInfo ) {
        if( !err ) {
            console.log(otpInfo);
            console.log(otpInfo[0].otpnumber);
            if(otpInfo[0].otpnumber == req.body.otpText)
            {
                return res.send("Success");
            }
            else
            {
                return res.send("Error");
            }
        }
        else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});


app.post( '/v1/vendor/info/:id', function( req, res ) {

   console.log("VendorInfo post");
  console.log(req.body);
            storeVendorInfo(req,res,function(req,res){
           console.log("storeVendorInfo success");
           
        });

  });
function storeVendorInfo(request,response,callback,param)
{
console.log("storeVendorInfo");
console.log(request.params.id);

 VendorInfoModel.update({ 'hotel.email':request.params.id},
      {
        hotel:{name:request.body.Name,email:request.params.id, id:request.body.id},
       address:{addressLine1:request.body.Address1,addressLine2:request.body.Address2,
        street:request.body.street, LandMark:request.body.Landmark, 
        areaName:request.body.Areaname,city:request.body.City, zip:request.body.zip, 
        latitude:request.body.latitude,longitude:request.body.longitude },
        phone:request.body.phone ,
        logo:request.body.logo,
        speciality:request.body.speciality,
        vegornonveg:request.body.vegornonveg,
        deliverRange: request.body.deliverRange,
        deliverCharge: request.body.deliverCharge,
        deliveryTime: request.body.deliveryTime,
        deliverAreas:request.body.deliverareas,
        minimumOrder: request.body.minimumOrder,
        isOpen:1,
        orderAcceptTimings:request.body.orderAcceptTimings
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

function storeVendoruniqueId(request,response,callback,param)
{
console.log("storeVendorUniquiId");
console.log(request.params.id);
 VendorInfoModel.update({ 'hotel.email':request.body.email},
      {
        uniqueid:request.body.uniqueid
      },
       function( err ) {
        if( !err ) {
            console.log( 'storeVendorUniquiId created' );
            callback(request,response);
            return ;
        } else {
         console.log( 'storeVendorUniquiId error' );
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
// app.post('/m/login', passport.authenticate('local'), function(req, res, next) {

//     req.session.save(function (err) {
        
      
//         if (err) {
//           var err_response = {
//                         tag: "login",
//                         status: false,
//                         error_msg: "Incorrect Email or Password"
//                         };
//             res.send(err_response);
//         }
//         var suc_response = {
//                         tag: "login",
//                         status: true
//                         };
//         res.send(suc_response);
//     });
// });

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

app.get( '/v1/vendor/city', function( request, response ) {
    console.log("GET --/v1/vendor/city/");
    console.log(request.query);
    return VendorInfoModel.find({ 'address.city':request.query.city},function( err, vendor ) {
        if( !err ) {
            console.log(vendor);
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/vendor/area', function( request, response ) {
    console.log("GET --/v1/vendor/area/");
    console.log(request.query);//find( { price: { $ne: 1.99, $exists: true } } )
    return VendorInfoModel.find(
        { 'address.areaName':request.query.areaName},
        function( err, vendor ) {
        if( !err ) {
            console.log(vendor);
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/vendor/delieveryareas', function( request, response ) {
    console.log("GET --/v1/vendor/delieveryareas/");
    console.log(request.query);//find( { price: { $ne: 1.99, $exists: true } } )
    return VendorInfoModel.find(
        { 
            deliverAreas:{
                            $elemMatch: {
                                 name: request.query.areaName
                                }
                            } 
        },
        function( err, vendor ) {
        if( !err ) {
            console.log(vendor);
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
});


app.get( '/v1/vendor/order/today/:id', function( request, response ) {
  console.log(request.params.id);
  var indiantime = new Date();
     indiantime.setHours(indiantime.getHours() + 5);
     indiantime.setMinutes(indiantime.getMinutes() + 30);
    var start = new Date(indiantime);
    start.setHours(0,0,0,0);
    console.log('starts time ' +start);
    var end = new Date(indiantime);
   
    end.setHours(23,59,59,999);
    console.log('endtime' + end);
     return OrderModel.find({  'hotel.email':request.params.id,
                               // 'date': {$gte: start, $lt: end}},
                               tracker:{
                            $elemMatch: {
                                 status:"ORDERED",
                                 time:{$gte: start, $lt: end}
                                }
                            }},
        function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});


app.get( '/v1/vendor/order_by_id/:id', function( request, response ) {
     console.log('/v1/vendor/order_by_id/:id');
     console.log(request.params.id);
     return OrderModel.find({ 'id':request.params.id},function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});


app.delete( '/v1/vendor/order/:id', function( request, response ) {

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
app.get( '/v1/vendor/order_all', function( request, response ) {
    console.log("/v1/vendor/order_all");
    return OrderModel.find(function( err, order ) {
        if( !err ) {
            console.log("no error");
            return response.send( order );
        } else {
            console.log("error");
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.post( '/v1/vendor/order', function( request, response ) {

  var res = +('order',function(data) {
    var order_id = request.body.hotel.id ;
    order_id = order_id + "R";
    order_id = order_id + data.sequence;
    console.log(order_id);
    var indiantime = new Date();

    indiantime.setHours(indiantime.getHours() + 5);
    indiantime.setMinutes(indiantime.getMinutes() + 30);
    var dc;
        console.log('post order');
        var order = new OrderModel({
            id:order_id,
            hotel:request.body.hotel,
            customer: {name: request.body.customer.name, email: request.body.customer.email, 
                phone: request.body.customer.phone,  
                address: request.body.customer.address},
                menu: request.body.menu,
                bill_value:request.body.bill_value,
                deliveryCharge: request.body.deliverCharge,
                totalCost:request.body.totalCost,
                current_status:"ORDERED",
                date:indiantime,
                instruction:request.body.instruction,
                tracker:  [{status:"ORDERED",time:indiantime}]     });
     
       
        order.save( function( err ) {
            if( !err ) {
                console.log( 'created' );
               // console.log( order);
                console.log( order.hotel.email);

                
                VendorInfoModel.find({ 'hotel.email':order.hotel.email},function( err, vendor ) {
                    if( !err ) {
                      console.log(vendor[0].uniqueid);
                     
                      var pn = {};
                       
                      console.log( order_id);
                      pn[vendor[0].uniqueid]  = {
                        msg:order_id
                      };

                      console.log(pn); // should print  Object { name="John"}
                      rootRef.update(pn);
                    } 
                    else {
                      console.log( err );
                    }
                    });  
                  return response.send( order );
                } else {
                  console.log( 'error' );
                  console.log( err );
                  return response.send('ERROR');
                }
            });
    });
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

//Delete a book
app.delete( '/v1/admin/list', function( request, response ) {

        return OrderModel.remove( {},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });

});
app.delete( '/v1/admin/account/all', function( request, response ) {
    return VendorInfoModel.remove( {},function( err ) {
            if( !err ) {
                console.log( 'vendor removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
});
app.put( '/v1/vendor/order/status/:id', function( request, response ) {

    console.log('/v1/vendor/order/status/:id');
    console.log(request.params.id);
    console.log(request.body);
    var indiantime = new Date();
     indiantime.setHours(indiantime.getHours() + 5);
     indiantime.setMinutes(indiantime.getMinutes() + 30);
     return OrderModel.findOneAndUpdate({ '_id':request.params.id},
        { 
          current_status:request.body.status,
          $addToSet: {tracker: {$each:[{status: request.body.status,  time:indiantime,reason:request.body.reason}] }}
        },
          function( err, order ) {
        if( !err ) {
            console.log("no error");
            console.log(order);
            var pn = {};
            var stat = {};
            stat[order.id] = 'Order ' + order.id +' - '+request.body.status;
           
              pn['customer']  = stat;
              console.log(pn); // should print  Object { name="John"}
                rootRef.update(
                pn
              );
            return response.send(order.tracker);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});


app.post( '/v1/vendor/menu/:id', function( request, response ) {
     console.log("post /vendor/menu/");
     console.log(request.body);
     console.log(request.params.id);

     return VendorInfoModel.update({ 'hotel.email':request.params.id},
        { $addToSet: {menu: {$each:[{name: request.body.fooditem,  price:request.body.foodprice,availability:1}] }}},function( err, order ) {
        if( !err ) {
            console.log("no error");
            console.log(order);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});


app.post( '/v1/admin/coverageArea', function( request, response ) {
     console.log("post /v1/admin/coverageArea");
     console.log(request.body);
     //var dd = {'cityName':"dvg",'subAreas':[{'name':"rajajinagar"},{'name':"vijaynagar"}]};
     var dd = {'cityName':request.body.cityName};
      var coverageArea = new CoverageAreaModel(
         dd);


        return coverageArea.save(function( err) {
        if( !err ) {
            console.log("no error");
            console.log(coverageArea);
            return response.send(coverageArea);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.put( '/v1/admin/coverageArea', function( request, response ) {
     console.log("v1/admin/coverageArea");
     console.log(request.body);
     console.log(request.body.cityName);
      console.log(request.body.areaName);
     var dd = {'name':"tilaknagar"};
        return CoverageAreaModel.update({ 'cityName':request.body.cityName},
            { $addToSet: {'subAreas': {$each:[{name: request.body.areaName}] }}},
            function( err, order ) 
             {
        if( !err ) {
            console.log("no error");
            console.log(order);
            return response.send('SUCCESS');
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.get( '/v1/admin/coverageArea', function( request, response ) {
    console.log("/v1/admin/coverageArea");
    return CoverageAreaModel.find(function( err, order ) {
        if( !err ) {
            console.log("no error");
            return response.send( order );
        } else {
            console.log("error");
            console.log( err );
            return response.send('ERROR');
        }
    });
});

//Delete a book
app.delete( '/v1/admin/coverageAreaAll', function( request, response ) {
    console.log("/v1/admin/coverageArea");
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return CoverageAreaModel.remove( {},function( err ) {
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


app.get( '/v1/vendor/menu/:id', function( request, response ) {
  // OrderModel.findById( request.params.id, function( err, book ) 
     console.log("get /vendor/menu/");
  console.log(request.params.id);
   console.log(request.body);
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
app.delete( '/v1/vendor/menu/item/:id/:fooditem', function( request, response ) {
     console.log('delete /v1/vendor/menu/item/');
     console.log(request.params.id);
      console.log(request.params.fooditem);
        return VendorInfoModel.update( { 'hotel.email':request.params.id},{ $pull: {menu: {"name": request.params.fooditem }}},function( err ) {
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
app.get( '/v1/admin/counters', function( request, response ) {
    console.log("/v1/admin/counters");
    return CountersModel.find(function( err, order ) {
        if( !err ) {
            console.log("no error");
            return response.send( order );
        } else {
            console.log("error");
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.post( '/v1/admin/counters/:id', function( request, response ) {
    console.log("post /v1/admin/counters");
    console.log(request.params.id);
     //var dd = {'cityName':"dvg",'subAreas':[{'name':"rajajinagar"},{'name':"vijaynagar"}]};
     var dd = {_id:request.params.id,
                sequence:0};
      var counters = new CountersModel(
         dd);
        return counters.save(function( err) {
        if( !err ) {
            console.log("no error");
            console.log(counters);
            return response.send(counters);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/admin/counters/test', function( request, response )
{
    console.log('/v1/admin/counters/test');
    var id = "H";
    var res = getNextSequence('hotel',function(data) {
    console.log('got data: '+data);
    id  = id + data.sequence;
    console.log(id);
    return response.send(data);
    });
   
});
var myCallback = function(data) {
  console.log('got data: '+data);
};
function getNextSequence(name,result)
{
   
    var ret = CountersModel.findOneAndUpdate(
            { _id: name },
            { $inc: { sequence: 1 }} ,
        function( err, order ) 
        {
        if( !err ) {
            console.log("no error");
            console.log(order);
            ret2 = order;
            result(order);
           // return order;
         
        } else {
            console.log( err );
           result(err);
        }
    });

}
app.post( '/v1/pn/register', function( request, response ) {
    console.log("post v1/pn/register");
    console.log(request.body);
 
    if( 1 ) {
            console.log('success');
            
            return response.send('success');
        } else {
            console.log( 'failure' );
            return response.send('failure');
        }

});
app.post( '/v1/pn/vendor/addTofirebase', function( request, response ) {
    console.log("post v1/pn/vendor/addTofirebase");
    console.log(request.body);
 
    if( request.body.message ) {
            console.log('success');
            var pn = {};
            pn[request.body.key]  = {
                info:request.body.message
            };
            console.log(pn); // should print  Object { name="John"}
              rootRef.update(
               pn
             );

            return response.send('success');
        }
        else if(request.body.update)
          {
            console.log('success');
            var pn = {};
            pn[request.body.key]  = {
                update:request.body.update
            };
            console.log(pn); // should print  Object { name="John"}
              rootRef.update(
               pn
             );
           // rootRef.child(request.body.key).set({ first: 'Fred', last: 'Flintstone' });
            // var newdata = {'newoffer':request.body.message};
            //  rootRef.push(newdata);
           
            return response.send('success');
        }
         else {
            console.log( 'failure' );
            return response.send('failure');
        }

});
app.post( '/v1/pn/customer/addTofirebase', function( request, response ) {
    console.log("post v1/pn/customer/addTofirebase");
    console.log(request.body);
 
    if( request.body.message ) {
            console.log('success');
            var pn = {};
            pn['customer']  = {
                info:request.body.message
            };
            console.log(pn); // should print  Object { name="John"}
              rootRef.update(
               pn
             );

            return response.send('success');
        }
        else if(request.body.update)
          {
            console.log('success');
            var pn = {};
            pn['customer']  = {
                update:request.body.update
            };
            console.log(pn); // should print  Object { name="John"}
              rootRef.update(
               pn
             );
           // rootRef.child(request.body.key).set({ first: 'Fred', last: 'Flintstone' });
            // var newdata = {'newoffer':request.body.message};
            //  rootRef.push(newdata);
           
            return response.send('success');
        }
         else {
            console.log( 'failure' );
            return response.send('failure');
        }

});
app.delete( '/v1/admin/counters/:id', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return CountersModel.remove( { '_id':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'counter removed' );
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