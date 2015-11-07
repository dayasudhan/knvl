app = angular.module("vendorModule", []);
  app.controller("mainController", function ($scope, $http, jsonFilter)
  {
  		 $scope.total2 = 123;
  	  $scope.getOrders = function (param) {
      console.log("getOrders");
      var url = "/v1/vendor/order/";
      url = url + param;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.orderlist = data;
          $scope.total2 = data.length;
          angular.forEach($scope.orderlist, function(item) {
          var timestamp = item._id.toString().substring(0,8);
          item.date = new Date( parseInt( timestamp, 16 ) * 1000 );
          item.statusArrayList =[
                      { id: 1, name: 'Ordered',disabled:true},
                      { id: 2, name: 'Accepted', disabled: false },
                      { id: 3, name: 'Delivered', disabled: false },
                      { id: 4, name: 'Cancelled', disabled: false },
                      { id: 5, name: 'Rejected', disabled: false }
                  ];
          item.DisabledStatus = [];          
          angular.forEach(item.tracker,function(st)
          {           
            item.DisabledStatus.push(st.status);
          });
        });
          $scope.getOrderSummary(param);
          // $scope.getMenuList(param);
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
$scope.trackerUpdateStatus = function(param1)
{
    console.log("trackerUpdateStatus");
    console.log(this.selectedStatus);
    console.log(param1);
   
    var url = "/v1/vendor/order/status/";
    url = url + param1;
    var postData={status:this.selectedStatus,reason:'ok'};
    $http.put(url,postData)
    .success(function (data, status, headers, config)
    {
    console.log("success put");
    console.log(data);
    })
    .error(function (data, status, headers, config)
    {
    getMenuList(param);
    console.log("errod on put");
    console.log(status);
    console.log(data);
    });
};

    $scope.getOrderSummary = function (param) {
      console.log("getOrdersummary");
      var url2 = "/v1/vendor/order/summary/";
      url2 = url2 + param;
      $http.get(url2)
        .success(function (data, status, headers, config)
        {
          $scope.orderSummarylist = data;
          
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

   
  });

  app.controller("menuController", function ($scope, $http, jsonFilter)
  {
 $scope.getMenuList = function (param) {
  console.log(param);
      console.log("getmenulist");
      var url3 = "/v1/vendor/menu/";
      url3 = url3 + param;
      $http.get(url3)
        .success(function (data, status, headers, config)
        {
          $scope.menuList = data;
          
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

    $scope.addMenu = function (param) {
      console.log("addMenu");
       console.log( $scope.fooditem);
      var url4 = "/v1/vendor/menu/";
      url4 = url4 + param;
      var postData={fooditem:$scope.fooditem,foodprice:$scope.foodprice};
      $http.post(url4,postData)
        .success(function (data, status, headers, config)
        {
           console.log("success add");
           console.log(data);
        })
        .error(function (data, status, headers, config)
        {
           getMenuList(param);
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
         $scope.getMenuList(param);
    };
  });
  app.controller("DetailsController", function ($scope, $http, jsonFilter)
  {
      $scope.addDetails = function (param) {
      console.log("addDetails 1");
      console.log($scope.deliverareas);
      var url = "/v1/vendor/info/";
      url = url + param;
      var postData={Name:$scope.hotelName, username: param, Address1:$scope.hotelAddress1, phone:$scope.hotelphone,
        Address2:"", street :"",Landmark:$scope.hotelLandmark, Areaname:$scope.hotelAreaname, 
        City:$scope.hotelcity, zip:$scope.hotelzip,latitude:$scope.latitude, longitude:$scope.longitude, logo:"",
         vegornonveg:$scope.vegornonveg, speciality: $scope.speciality , deliverrange:$scope.deliverrange,deliverareas:$scope.deliverareas};
      $http.post(url,postData)
        .success(function (data, status, headers, config)
        {
            console.log("addDetails success");
        })
        .error(function (data, status, headers, config)
        {
          console.log("addDetails error");
        });
    };

      $scope.getDetails = function (param) {
      console.log("getDetails");
      console.log(param);
      var url = "/v1/vendor/info/";
      url = url + param;
      // var postData={Name:$scope.hotelName, username: param, Address1:$scope.hotelAddress1, phone:$scope.hotelphone,
      //   Address2:"", street :"",Landmark:$scope.hotelLandmark, Areaname:$scope.hotelAreaname, 
      //   City:$scope.hotelcity, zip:$scope.hotelzip,latitude:$scope.latitude, longitude:$scope.longitude, logo:"",
      //    vegornonveg:$scope.vegornonveg, speciality: $scope.speciality , deliverrange:$scope.deliverrange,deliverareas:$scope.deliverareas};
      $http.get(url)
        .success(function (data, status, headers, config)
        {
            console.log("getDetails success");
            console.log(data[0]);
             $scope.hotelName = data[0].hotel.name;
             $scope.hotelAddress1 =data[0].address.addressLine1;
             $scope.hotelphone =data[0].phone;
            $scope.hotelLandmark =data[0].address.LandMark;
            $scope.hotelAreaname =data[0].address.areaName;
            $scope.hotelcity =data[0].address.city;
            $scope.hotelzip =data[0].address.zip;
            $scope.latitude =data[0].address.latitude;
            $scope.longitude =data[0].address.longitude;
          //  $scope.vegornonveg =data[0].
            $scope.speciality =data[0].speciality;
            $scope.deliverrange =data[0].deliverRange;
            $scope.deliverareas =data[0].deliverAreas;
        })
        .error(function (data, status, headers, config)
        {
          console.log("getDetails error");
        });
    };



  });


