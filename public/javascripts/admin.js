app = angular.module("adminModule", []);
  app.controller("adminController", function ($scope, $http, jsonFilter)
  {
  		 $scope.total2 = 123;
  	  $scope.getOrders = function () {
      console.log("getOrders");
      var url = "/v1/vendor/order_all";
      //url = url + param;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.orderlist = data;
          $scope.total2 = data.length;
         // $scope.getMenuList(param);
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
  });



