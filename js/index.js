$(document).ready(function(){
 
  var btns = $(".btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = $(".active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
  }

  var bts_notification = $(".notification-btn");
  for (var i = 0; i < bts_notification.length; i++){
        bts_notification[i].addEventListener("click",function(){
        var current = $(".active-notification");
        current[0].className = current[0].className.replace(" active-notification","");
        this.className += " active-notification";
    });
  }

  $(".rider-btn").click(function(){
    $("#buyer_wrapper,#order_details_wrapper").css("display","none");
    $("#riders_wrapper").css("display","block");
  })
  $(".deliveries-btn").click(function(){
    $("#riders_wrapper,#buyer_wrapper").css("display","none");
    $("#order_details_wrapper").css("display","block");

  })
  $(".buyer-btn").click(function(){
    $("#riders_wrapper,#order_details_wrapper").css("display","none");
    $("#buyer_wrapper").css("display","block");
  })

})