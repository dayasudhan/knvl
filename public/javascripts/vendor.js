
function vendor(param)
{
  
   console.log("vendor.js  -0--");

  
    var postData={title:"231",city:"123"};
    var url = "/v1/vendor/order/";
    url = url + param;
    console.log(url);
    $.get(url,
      postData,
      function(data, textStatus, jqXHR)
      {
       console.log("vl 1")
        var trHTML = '';
        $.each(data, function (i, item) {

           if(item.customer != null)
              trHTML += '<tr><td>' + item.customer.name + '</td><td>' + item.customer.email + '</td><td>' + item.customer.phone + '</td>';
            if(item.menu != null)
            {
              $.each(item.menu, function (j, itemmenu) {
                if(j != 0 )
                {
                  trHTML +='<tr>';
                }  
                trHTML += '<td>' + itemmenu.name + '</td><td>'+itemmenu.no_of_order + '</td>';
              });
              trHTML +='</tr>';
            }
             trHTML +='/tr';  
           
        });
        $('#t02').append(trHTML);
          //data - JSON object from server.
      },"json").fail(function(jqXHR, textStatus, errorThrown) 
          {
    console.log(textStatus);
    console.log(errorThrown); 
      });
  //  });
}


function menu_vendor(param)
{
   console.log("vendor.js  -0--");
    var url = "/v1/vendor/menu/";
    var postData={title:"sumne",city:"213"};
    url = url + param;
    console.log(url);
    $.get(url,
      postData,
      function(data, textStatus, jqXHR)
      {
       console.log("vl 1")
        var trHTML = '';
        $.each(data, function (i, item) {
           if(item != null)
              trHTML += '<tr><td>' + item.name + '</td><td>' + item.price + '</td><td>'+
      '<input type="checkbox" name="myTextEditBox" value="checked"> '+
      '</td></tr>' ;
        });
        $('#t02').append(trHTML);
          //data - JSON object from server.
      },"json").fail(function(jqXHR, textStatus, errorThrown) 
          {
    console.log(textStatus);
    console.log(errorThrown); 
      });
  //  });
}

function order_summary(param)
{
   console.log("vendor.js  -0--");
    var url = "/v1/vendor/order/summary/";
    var postData={title:"sumne",city:"213"};
    url = url + param;
    console.log(url);
    $.get(url,
      postData,
      function(data, textStatus, jqXHR)
      {
       console.log("vl 1")
        var trHTML = '';
        $.each(data, function (i, item) {
           if(item != null)
              trHTML += '<tr><td>' + item._id + '</td><td>' + item.total + '</td></tr>' ;
        });
        $('#t02').append(trHTML);
          //data - JSON object from server.
      },"json").fail(function(jqXHR, textStatus, errorThrown) 
          {
    console.log(textStatus);
    console.log(errorThrown); 
      });
  //  });
}

function menu_add(form,username) {

    console.log("vendor.js  menu_add");
    console.log(form);
    var url = "/v1/vendor/menu/";
    var postData={fooditem:form.fooditem.value,foodprice:form.foodprice.value};
    url = url + username;
    console.log(url);
    $.post(url,
      postData,
      function(data, textStatus, jqXHR)
      {
       console.log(data)
      },"json").fail(function(jqXHR, textStatus, errorThrown) 
          {
    console.log(textStatus);
    console.log(errorThrown); 
      });
}