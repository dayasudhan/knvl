var customerApp =angular.module("mainModule", ['ui.router']);
customerApp.config( function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '../../views/customer_home.ejs',
            controller: 'mainController'
        })
        
        // nested list with custom controller
        .state('menu', {
            url: '/menu',
            templateUrl: '../../views/customer_menu.ejs',
            controller: 'mainController'
        })
      });
  customerApp.controller('mainController', function ($rootScope,$scope, $http, jsonFilter,$window)
  {
   

     $scope.findRestaurantsByNearBy = function () {
    //  $scope.getCurrentAddress()
      console.log("findRestaurantsByNearBy");
      //var url = "/v1/vendor/city?";
      var url = "/v1/vendor/delieveryareas?";
      console.log($scope.areaName);
       console.log($scope.city);
      url = url +  "city=" +$scope.city + "&areaName="+$scope.areaName;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.hotellist = data;
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

    $scope.findRestaurants = function () {
      console.log("findRestaurants");
    //  var url = "/v1/vendor/city?";
     var url = "/v1/vendor/delieveryareas?";
      console.log($scope.search_areaname);
      url = url +  "city=" +$scope.cityCoverage.citys[$scope.selectedCity] + "&areaName="+$scope.search_areaname;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.hotellist = data;
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
    $scope.getOrderStatus = function () {
      console.log("getOrderStatus");
       console.log($scope.orderId);
      var url = "/v1/vendor/order_by_id/";
      url = url + $scope.orderId;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          console.log(data);
          $scope.OrderStatus = data;
          $scope.order_status = "delivered";
          console.log($scope.OrderStatus[0].tracker);
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
    $scope.postOrder = function (ordarr) {
      console.log("postOrder");
      console.log(ordarr);
      var url = "/v1/vendor/order";
      $http.post(url, ordarr)
        .success(function (data, status, headers)
        {
          console.log("Success in postorder");
           
            console.log(data.id)
            $scope.orderId =  data.id;
        })
        .error(function (data, status, headers)
        {
          console.log("ERROR in postorder");
        });
    };


    $scope.currentHotel = function (index) {
      console.log("currentHotel");
      // var myHidden = document.getElementById("<%= user.local.email>");
      //  console.log(myHidden);
      console.log(index);
     
      console.log($scope.hotellist[index]);
      $rootScope.hotel =  $scope.hotellist[index];
       angular.forEach($scope.hotel.menu, function(item) {
            item.qty = 0 ;
        })

       // console.log($scope.user);
       //  $scope.getCustsomerDetails();

          // $window.location.href = '/menu'; 
    };

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.hotel.menu, function(item) {
            total += item.price * item.qty;
        })
        return total;
    };

    $scope.confirmOrder = function() {
      if($scope.isOrderPresent)
      {
        for (i = 0; i < 5000; i++) {
          $scope.postOrder($scope.orderSummary);
      }
      }
    }
    $scope.order = function() {

      console.log("order function 1");
      console.log($scope.user);
      console.log("order function 2");
       var ordMenu =  [];
       $scope.isOrderPresent =  false;
       var total_price = 0;
       $scope.showModal =false;
       angular.forEach($scope.hotel.menu, function(item) {
          var obj = new Object();
          if(item.qty > 0)
          {
            obj.name = item.name;
            obj.no_of_order = item.qty;
            obj.price = item.qty * item.price;
            total_price +=  obj.price;
            ordMenu.push(obj);
            $scope.isOrderPresent = true;
          }
        });
        console.log("order function 34523");
       if($scope.isOrderPresent == false)
       {
         console.log("order function 345");
         $window.alert("no items selected");

         $scope.showModal =false;
       }
       var totalCost = $scope.hotel.deliverCharge +  total_price;
        var ordarr = {
         "hotel":$scope.hotel.hotel,
          "menu":ordMenu,
          "totalCost":totalCost,
          "bill_value":total_price,
          "deliverCharge":$scope.hotel.deliverCharge,
          "customer":{"name":$scope.user,"email": "","phone":$scope.phone,
          "address":{"addressLine1":$scope.flat_no,"addressLine2":$scope.address,"street":"", 
          "LandMark":$scope.landmark, "areaName":$scope.areaName,"city":$scope.city,
           "zip":$scope.zip, "latitude":$scope.latitude,"longitude":$scope.longitude}}
        };
        $scope.orderSummary = ordarr;
        $scope.total_price = total_price;

    };

    $scope.getCustsomerDetails = function () {
      console.log("getCustsomerDetails");
      var url = "/v1/customer";
      $http.get(url)
        .success(function (data, status, headers, config)
        {
           console.log(data[0].phone);
                   $scope.phone = data[0].phone;
          $scope.user = data[0].id;
          $scope.flat_no = data[0].address.addressLine1;
          $scope.address = data[0].address.addressLine2;
          $scope.landmark = data[0].address.LandMark;
          $scope.areaName = data[0].address.areaName;
          $scope.city = data[0].address.city;
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

    $scope.postCustsomerDetails = function (param) {
      console.log("postCustsomerDetails");
      console.log(ordarr);
      var url = "/v1/customer/";
      url = url + param;
      $http.post(url, ordarr)
        .success(function (data, status, headers)
        {
          console.log("Success in postorder")
        })
        .error(function (data, status, headers)
        {
          console.log("ERROR in postorder");
        });
    };
    $scope.updateCitySelected = function(){
    };
    $scope.getCityCoverage = function(){
      console.log("getCityCoverage");
      var url = "/v1/admin/coverageArea";
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          console.log("response");
          console.log(data);
          
          var cityCoverage =  [];
          var objCity = [];
          angular.forEach(data, function(city) {
            var obj = new Object();
            var obj2 = new Object();
            obj2 = city.cityName;
             var subAreaCoverage =  [];
             angular.forEach(city.subAreas, function(area) {
             //  var obj2 = new Object();
              // obj2.subAreaName = area.name;
               subAreaCoverage.push(area.name);
             });
             obj.subAreas = subAreaCoverage;
             cityCoverage.push(obj);
              objCity.push(obj2)
          });
           console.log("sngulr");
           cityCoverage.citys = objCity;
           $scope.cityCoverage = cityCoverage;
           $scope.selectedCity = 0;
      console.log($scope.cityCoverage);
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

    $scope.getCurrentAddress = function()
    {
      console.log("getCurrentAddress");
      var url = "/v1/customer";

      if (navigator.geolocation) {
        console.log("getCurrentAddress 2");
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log("getCurrentAddress 4");
      }

    };
    
    function showPosition(position)
    {
      console.log("getCurrentAddress 3");
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
      url = url + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false';
      //url = url + 12.999390499999999 + ',' + 77.55813169999999 + '&sensor=false';
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          console.log("getCurrentAddress 4  ");
          console.log(data);
          console.log("getCurrentAddress 5  ");
          console.log(data.results[0].address_components[0].long_name);
          console.log(data.results[0].address_components[1].long_name);
          console.log(data.results[0].address_components[2].long_name);
          console.log(data.results[0].address_components[3].long_name);
          console.log(data.results[0].address_components[4].long_name);
          console.log(data.results[0].formatted_address);
           $scope.address = data.results[0].address_components[0].long_name + ',' + data.results[0].address_components[1].long_name;
           $scope.areaName = data.results[0].address_components[2].long_name ;
           $scope.landmark = data.results[0].address_components[3].long_name;
           $scope.city = data.results[0].address_components[4].long_name;
           $scope.latitude = position.coords.latitude;
           $scope.longitude = position.coords.longitude;
           $scope.zip = data.results[0].address_components[8].long_name;
        })
        .error(function (data, status, headers, config)
        {

          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    }
  });
