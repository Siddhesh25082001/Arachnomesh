var pageNo = 1;
var juryData = "";
var userData = "";
var logosData = "";
var dataCount = 0;
var stopFlag = true;

String.prototype.ltrim = function () {
  return this.replace(/^\s+/, "");
};
// Wait for the DOM to be ready
$(function () {
  sliderFunction();
  if(localStorage.getItem('_rl')==='jury') {
    document.getElementById('categoryURL').style.display = "none";
 }
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('_tk'));
    }
  });

  if (window.location.href.split("?")[1]) {
    var inden = window.location.href.split("?")[1].split("=")[1];

    //getting browser information
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var verOffset;

    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
    } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
    } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
    } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
    } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
    }

    var request = $.ajax({
      type: "get",
      contentType: "application/json",
      url: "https://ipapi.co/json/",
    });

    request.done(function (msg) {
      msg["value"] = inden;
      msg["browser"] = browserName;

      var req = $.ajax({
        type: "POST",
        data: JSON.stringify(msg),
        contentType: "application/json",

        url: "/api/website-clicks",
      });
      return false;
    });

    request.fail(function (jqXHR, textStatus) {


      alert("Request failed: " + textStatus);
      return false;
    });
  }

  var lead = localStorage.getItem("submit");
  // var local = localStorage.getItem("user");
  var urlparam=new URLSearchParams(window.location.search)
  var paramLocal=""
  if (urlparam.has("login")) {
    paramLocal=urlparam.get("login")
  }
  
  
  // var local = localStorage.getItem("userId");

  //open popup modal here
  if (paramLocal==="" || paramLocal==="false" ) {
    setTimeout(function () {
      $("#open-model").click();
      $(".homemodal").addClass('modal_opened');
    }, 3500);
    $('.close').click(function () {
      $("#myModal").fadeOut(100);
    });
  }
  // if (!local || !paramLocal) {
  //   setTimeout(function () {
  //     $("#open-model").click();
  //     $(".homemodal").addClass('modal_opened');
  //   }, 3500);
  //   $('.close').click(function () {
  //     $("#myModal").fadeOut(100);
  //   });
  // }

  $("form[name='lead']").validate({
    rules: {
      mobileNo: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
    },
    messages: {
      mobileNo: "Enter your valid 10-digit mobile number.",
    },
    submitHandler: function (form) {

      var formData = JSON.stringify($(form).serializeArray());

      var formObject = $.parseJSON(formData);
      if (inden) {
        formObject[0]["campaign"] = inden;
      } else {
        formObject[0]["campaign"] = "NA";
      }

      var formCData = JSON.stringify(formObject);

      var request = $.ajax({
        type: "POST",
        data: formCData,
        contentType: "application/json",

        url: "/api/lead-capture",
      });

      request.done(function (msg) {

        let data = localStorage.setItem("submit", "done");


        var url =
          `https://award.channelier.com/auth/login?no=` +
          $(form).serializeArray()[0]["value"];
        $(location).attr("href", url);

        return false;
      });

      request.fail(function (jqXHR, textStatus) {


        alert("Request failed: " + textStatus);
        return false;
      });
    },
  });
  //var local = null;
  // if (local ||) {
  //   $("#loginLogout").html(
  //     // `<a href="javascript:void(0)" onclick="logout()" class="brown-btn hvr-shutter-out-vertical">Logout</a>`
  //     `<a href="https://award-test.arachnomesh.com/profile" class="brown-btn hvr-shutter-out-vertical">Profile</a>`
  //   );
  //   $("#Dashboard").html(`<a href="javascript:void(0)" onclick="dasboard()">
  //                  <div>Dashboard</div>
  //               </a>`);
  // } else {
  //   $("#loginLogout").html(
  //     `<a href="javascript:void(0)" onclick="logIn()" class="brown-btn hvr-shutter-out-vertical">LogIn</a>`
  //   );
  //   $("#Dashboard").empty();
  // }
  if (paramLocal==="true") {
    $("#loginLogout").html(
      // `<a href="javascript:void(0)" onclick="logout()" class="brown-btn hvr-shutter-out-vertical">Logout</a>`
      `<a href="https://award.channelier.com/profile" class="brown-btn hvr-shutter-out-vertical">Profile</a>`
    );
    $("#Dashboard").html(`<a href="javascript:void(0)" onclick="dasboard()">
                   <div>Dashboard</div>
                </a>`);
  } else {
   
    $("#loginLogout").html(
      `<a href="javascript:void(0)" onclick="logIn()" class="brown-btn hvr-shutter-out-vertical">LogIn</a>`
    );
    $("#Dashboard").empty();
    
  }

  jQuery.validator.addMethod(
    "noSpace",
    function (value, element) {
      return !(value.ltrim() != value) && value != "";
    },
    "Spaces are not allowed."
  );
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='contact']").validate({
    // Specify validation rules
    rules: {
      userName: {
        required: true,
        noSpace: true,
      },
      userEmail: {
        required: true,
      },
      userContact: {
        required: true,
      },
      query: {
        required: true,
        noSpace: true,
      },
    },
    // Specify validation error messages
    messages: {
      //  userName: "Enter your name.",

      userEmail: "Enter a valid E-mail ID.",

      //  query: "Enter your query."
    },

    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {

      var formData = JSON.stringify($(form).serializeArray());


      //alert(formData);
      // console.log($(form).serializeArray());
      var request = $.ajax({
        type: "POST",
        data: formData,
        contentType: "application/json",
        url: "/api/user-query",
      });

      request.done(function (msg) {

        if (msg["_id"]) {
          $("#contact").each(function () {
            this.reset();
            $("#contact-success").html(
              '<div class="alert contact-success alert-success" role="alert" id="contact-success">Hello! Thanks for sharing your details. Our team will get in touch with you shortly.</div>'
            );

            setTimeout(function () {
              $("#contact-success").fadeOut("fast");
            }, 3000);
            //
          });
        }


      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    },
  });
});

function logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("registration");
  localStorage.removeItem('_tk');
  localStorage.removeItem('_rl');
  location.reload();
}
function pollingPage() {
  var url = `https://${window.location.hostname}/ng-award/#/user-polling`;
  $(location).attr("href", url);
}

function categoryPage() {
  // var authStatus = window.localStorage.getItem("userId");
  // if (authStatus) {
  //   var url = `https://${window.location.hostname}/award-category.html`;
  //   $(location).attr("href", url);
  // } else {
  //   var url = `https://${window.location.hostname}/ng-award/`;
  //   $(location).attr("href", url);
  // }
  var url = `https://award.channelier.com/auth/login`;
  $(location).attr("href", url);

}
function benefitPage() {
  var url = `https://${window.location.hostname}/ng-award/#/benefit`;
  $(location).attr("href", url);
}
function allNomination() {
  // var authStatus = window.localStorage.getItem("userId");
  // if (authStatus) {
  //   var url = `https://${window.location.hostname}/ng-award/#/nominations-all`;
  //   $(location).attr("href", url);
  // } else {
  //   var url = `https://${window.location.hostname}/ng-award/`;
  //   $(location).attr("href", url);
  var url = `https://award.channelier.com/auth/login`;
  $(location).attr("href", url);
  // }
}
function dasboard() {
  // var ind=localStorage.getItem('_rl')==='jury' ? 'jury' : 'user';
  // var url = `https://${window.location.hostname}/ng-award/#/${ind}-dashboard`;
  var url = `https://award.channelier.com/profile`;
  $(location).attr("href", url);
}
function logIn() {
  // var url = `https://${window.location.hostname}/ng-award/`;
  var url = `https://award.channelier.com/auth/login`;
  $(location).attr("href", url);
}
function redirectTong() {
  var url = `https://${window.location.hostname}/ng-award/`;
  $(location).attr("href", url);
}
function juryPage(year) {
  // var authStatus = window.localStorage.getItem("userId");
  // if (authStatus) {
  //   var url = `https://${window.location.hostname}/ng-award/#/jury;year=${year}`;
  //   $(location).attr("href", url);
  // } else {
  //   var url = `https://${window.location.hostname}/ng-award/`;
  //   $(location).attr("href", url);
  // }
  var url = `https://award.channelier.com/auth/login`;
  $(location).attr("href", url);
}
function winnerPage(year) {
  var url = `https://${window.location.hostname}/ng-award/#/winner/${year}`;
  $(location).attr("href", url);
}

function sliderFunction() {

  setTimeout(function () {
    sliderInit();
  }, 2000);
}

function addBrands(data) {

  var template = ` <div class="item">
                     <div class="jury-sec row" >${data}</div></div>`;

  return template;
}

function addLogo(data) {


  var Logotemplate = ` <div class="item">
  <div class="jury-sec row">${data}</div></div>`;
  return Logotemplate;
}

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-166657922-1");



$(document).ready(function () {
  // Add smooth scrolling to all links
  $(".one-page-menu li a, .dropdown-content a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

$(document).ready(function () {
  $('#primary-menu-trigger').click(function () {
    $('.homepage-menu').toggleClass('d-block');
    $('.login_menu').toggleClass('d-block');
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop()) {
    $('#toTop').fadeIn();
  } else {
    $('#toTop').fadeOut();
  }
});

$("#toTop").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 1000);
});


$( document ).ready(function() {
  var ctrlVideo = document.getElementById("vdieo"); 
    $('#play-video').click(function(){

      if($(this).hasClass("active")) {
      
      ctrlVideo.play();
        // $('.video-play-button').html("Pause");
        $(this).toggleClass("active");    
      } 
      
      else {
        ctrlVideo.pause();
        // $('.video-play-button').html("play");
        $(this).toggleClass("active");
      }

    });

    var ctrlVideo1 = document.getElementById("vdieo1"); 
    $('#play-video1').click(function(){

      if($(this).hasClass("active")) {
      
      ctrlVideo1.play();
        // $('.video-play-button').html("Pause");
        $(this).toggleClass("active");    
      } 
      
      else {
        ctrlVideo1.pause();
        // $('.video-play-button').html("play");
        $(this).toggleClass("active");
      }

    });

    // $('#vdieo1').hover(function toggleControls() {
    //   if (this.hasAttribute("controls")) {
    //       this.removeAttribute("controls")
    //   } else {
    //       this.setAttribute("controls", "controls")
    //   }
    // })
});