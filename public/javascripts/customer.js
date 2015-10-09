angular.module("mainModule", [])
  .controller("mainController", function ($scope, $http, jsonFilter)
  {
    $scope.findRestaurants = function () {
      console.log("findRestaurants");
      var url = "/v1/vendor/city/";
      url = url + $scope.search_city;
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
      $scope.hotel =  $scope.hotellist[index];
       angular.forEach($scope.hotel.menu, function(item) {
            item.qty = 0 ;
        })

       console.log($scope.user);
        $scope.getCustsomerDetails();
    };

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.hotel.menu, function(item) {
            total += item.price * item.qty;
        })
        return total;
    };
    $scope.order = function() {

      console.log("order function 1");
      console.log($scope.user);
      console.log("order function 2");
       var ordMenu =  [];
       var isOrderPresent =  false;
       angular.forEach($scope.hotel.menu, function(item) {
          var obj = new Object();
          if(item.qty > 0)
          {
            obj.name = item.name;
            obj.no_of_order = item.qty;
            ordMenu.push(obj);
            isOrderPresent = true;
          }
        });
        var ordarr = {
         "hotel":{"name":$scope.hotel.hotel.name,"email": $scope.hotel.hotel.email},
          "menu":ordMenu,
          "customer":{"name":$scope.user,"email": "","phone":$scope.phone},
          "address":{"addressLine1":$scope.flat_no,"addressLine2":$scope.address,"street":"", 
          "LandMark":$scope.landmark, "areaName":"","city":"", "zip":"", "latitude":0,"longitude":0}
        };
        if(isOrderPresent)
        {
          $scope.postOrder(ordarr);
        }
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

  });