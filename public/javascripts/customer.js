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
   

    $scope.findRestaurants = function () {
      console.log("findRestaurants");
      var url = "/v1/vendor/city/";
      console.log($scope.search_areaname);
      url = url +  $scope.cityCoverage.citys[$scope.selectedCity];
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
          console.log("Success in postorder")
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
        $scope.postOrder($scope.orderSummary);
      }
    }
    $scope.order = function() {

      console.log("order function 1");
      console.log($scope.user);
      console.log("order function 2");
       var ordMenu =  [];
       var isOrderPresent =  false;
       var total_price = 0;
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
       
        var ordarr = {
         "hotel":{"name":$scope.hotel.hotel.name,"email": $scope.hotel.hotel.email},
          "menu":ordMenu,
          "customer":{"name":$scope.user,"email": "","phone":$scope.phone},
          "address":{"addressLine1":$scope.flat_no,"addressLine2":$scope.address,"street":"", 
          "LandMark":$scope.landmark, "areaName":"","city":"", "zip":"", "latitude":0,"longitude":0}
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

  });