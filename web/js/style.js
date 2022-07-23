//  @Prasad's JS
$(document).ready(function () {
  addWinners();
	autoPlay(true);
});


 var currentPage = 1;
 var limit = 4;

function addWinners() {
  var arr=[{"category":"Feminine Hygiene","name":"Menstrual Cup","type":"jpg"},{"category":"Face & Body, Bath & Shower","name":"Lotus Herbals YouthRx Youth Activating Serum + Cream","type":"jpg"},{"category":"Hair Care","name":"WOW Skin Science Red Onion Black Seed Hair Oil","type":"jpeg"},{"category":"Baby Bath & Hygiene","name":"Dewy Love Baby Face Cream","type":"jpeg"},{"category":"Baby Food & Formula","name":"Meadbery Kids Multivitamin Gummy","type":"jpeg"},{"category":"Dairy","name":"Farm Fresh MIlk","type":"jpg"},{"category":"Non-Alcoholic Beer, Wine","name":"Cranberry Beer","type":"jpeg"},{"category":"Tea","name":"Chamomile Mint Citrus Green Tea","type":"jpg"},{"category":"Ice Creams & Desserts","name":"Iceberg Organic Icecreams","type":"jpg"},{"category":"Beer","name":"Heineken","type":"jpg"},{"category":"Salt, Sugar & Jaggery","name":"G-LOW Sugar","type":"png"},{"category":"Fragrances & Deos","name":"RxSAFE Deotize","type":"jpeg"},{"category":"Everyday Medicine","name":"WELL Brain Activ","type":"jpg"},{"category":"Supplements & Proteins","name":"Vitus Glow","type":"png"},{"category":"Makeup","name":"Beet Tint - BeetRoot Pigmented Lip And Cheek Tint","type":"jpg"},{"category":"Toothpaste","name":"Herbal Toothpaste","type":"jpg"},{"category":"Coffee","name":"Attikan Estate | Medium-Dark Roast","type":"jpeg"},{"category":"Health Drinks","name":"Nutriorg Immunity Booster Juice","type":"jpg"},{"category":"Water","name":"MOJOCO Immunity Booster Natural Tender Coconut Water Energy Drink","type":"jpeg"},{"category":"Pooja Needs","name":"Shri Ganesh Premium Camphor","type":"png"},{"category":"Shoe Care","name":"Helios Super Sneaker Cleaner","type":"jpeg"},{"category":"All Purpose Cleaners","name":"Floor Cleaner","type":"jpeg"},{"category":"Pet Meals & Treats","name":"Puppy Cereal","type":"png"},{"category":"Wine","name":"Asav Cabernet Shiraz","type":"jpeg"},{"category":"Breakfast Cereals","name":"Dark Chocolate Granola","type":"jpeg"},{"category":"Chocolates","name":"Schmitten Bites Pouch","type":"png"},{"category":"Snacks","name":"Golden Sweet Potato with Peri-Peri","type":"jpeg"},{"category":"Frozen Snacks","name":"Meatzza Krispy Fried Chicken","type":"jpeg"},{"category":"Biscuits","name":"Dream Lite","type":"png"},{"category":"Noodle, Pasta, Vermicelli","name":"Wai Wai Ready to Eat Noodles","type":"jpeg"},{"category":"Pickles & Chutney","name":"Szechuan Chutney","type":"jpeg"},{"category":"Instant Snacks","name":"Cornitos DIY Kit Falafel Wrap","type":"jpeg"},{"category":"Namkeen","name":"Navrattan","type":"png"}]
  var temp="";
  for(let i=1;i<=33;i++) {
    temp += ` 
    <div class="swiper-slide">
      <div class="winner-box">
        <div class="nomination_product">
          <img data-src="./images/Product of the year winners/${i}.${arr[i-1].type}" class="lazyload" alt="Img ${i}" />
        </div>
        <div class="winner-detail">
          <h2>${arr[i-1].category}​​​​​​​</h2>
          <h2 style="color: white !important">${arr[i-1].name}</h2>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("productOfTheYear").innerHTML=temp;
  var arr2=[{"category":"Tea","name":"Instant Masala Chai","type":"jpeg"},{"category":"Shaving Care","name":"Fitkari After Shave Gel","type":"jpeg"},{"category":"Ayurveda","name":"Navratna Therapy","type":"jpg"},{"category":"Non-wheat flour","name":"Pansari Speciality Flour","type":"jpeg"},{"category":"Baby Food & Formula","name":"Fettle Bio Products - First Bowl","type":"jpeg"},{"category":"Dairy","name":"Dreamry Shake N' Sip Flavoured Milk","type":"jpeg"},{"category":"Supplements & Proteins","name":"That Time of the Month","type":"jpg"},{"category":"Face & Body, Bath & Shower","name":"Detoxfying Sea Algae Mask","type":"jpg"},{"category":"Energy & Soft Drinks","name":"TeaFit Tangy Toasty Barley Tea","type":"png"},{"category":"Health Drinks","name":"Smoothie Chakras","type":"jpeg"},{"category":"Dry Fruits","name":"Mom's Superfood Trail Mix","type":"jpg"},{"category":"Pulses","name":"Himalayan Natives Pulses","type":"png"},{"category":"Instant Snacks & Breakfast Mixes","name":"Apis Cornflakes","type":"jpeg"},{"category":"Snacks","name":"Mittai Kadai","type":"jpeg"},{"category":"Chocolates","name":"Entisi Chocolatier","type":"webp"},{"category":"Pet Meals & Treats","name":"Drools Calcium Bone","type":"webp"},{"category":"Beer","name":"Kingfisher Ultra Witbier","type":"jpeg"},{"category":"Namkeen","name":"Lajawaab Mixture","type":"jpg"},{"category":"Rice & Rice Products","name":"Daawat Sehat","type":"webp"},{"category":"Coffee","name":"NESCAFÉ SUNRISE Premium Liquid Decoction","type":"jpg"}];
  temp="";
  for(let i=1;i<=20;i++) {
    temp += ` 
    <div class="swiper-slide">
      <div class="winner-box" style="height: 370px">
        <div class="nomination_product">
          <img data-src="./images/Product launch of the year/${i}.${arr2[i-1].type}" class="lazyload" alt="Img ${i}" />
        </div>
        <div class="winner-detail">
          <h2>${arr2[i-1].category}​​​​​​​</h2>
          <h2 style="color: white !important">${arr2[i-1].name}</h2>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("productLaunchOfTheYear").innerHTML=temp;
  var arr3=[{"category":"Baby Bath & Hygiene","name":"Mommypure","type":"jpeg"},{"category":"Dairy","name":"Bun Maska","type":"png"},{"category":"Biscuits","name":"Americana Biscuits","type":"jpeg"},{"category":"Supplements & Proteins","name":"Sukumin","type":"png"},{"category":"Over the counter (OTC)","name":"WELL","type":"jpeg"},{"category":"Skin Care","name":"Nature's Essence","type":"jpeg"},{"category":"Face & Body, Bath & Shower","name":"mCaffeine","type":"png"},{"category":"Hair Care","name":"Ayouthveda","type":"png"},{"category":"Feminine Hygiene","name":"Pee Safe","type":"jpeg"},{"category":"Fragrances & Deos","name":"Beardo","type":"jpg"},{"category":"All Purpose Cleaners","name":"Helper","type":"jpeg"},{"category":"Fresheners & Repellents","name":"Aroma Galaxy","type":"png"},{"category":"Dry Fruits","name":"Happilo","type":"png"},{"category":"Edible oils","name":"Sunpure","type":"png"},{"category":"Beer","name":"Kingfisher","type":"jpeg"},{"category":"Breakfast Cereals","name":"Tata Soulfull","type":"png"},{"category":"Snacks","name":"Go Nuts !!","type":"png"},{"category":"Chocolates","name":"SMOOR","type":"png"},{"category":"Spreads","name":"MyFitness","type":"jpg"},{"category":"Gourmet Foods","name":"La Americana Gourmet","type":"jpeg"},{"category":"Pet Meals & Treats","name":"Dogsee","type":"png"},{"category":"Meat","name":"Kolkata Meat","type":"png"}];
  temp="";
  for(let i=1;i<=22;i++) {
    temp += ` 
    <div class="swiper-slide">
      <div class="winner-box" style="height: 350px">
        <div class="nomination_product">
          <img data-src="./images/Brand of the year/${i}.${arr3[i-1].type}" class="lazyload" alt="Img ${i}" />
        </div>
        <div class="winner-detail">
          <h2>${arr3[i-1].category}​​​​​​​</h2>
          <h2 style="color: white !important">${arr3[i-1].name}</h2>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("brandOfTheYear").innerHTML=temp;
}

function autoPlay(flag) {
      setTimeout(function () {
		$(".slider-element").addClass("animate__animated animate__fadeOutUp");
	}, 4000);

	setTimeout(function () {
		$(".slider-element").addClass("d-none");
	},5000);
           
            $('.top-banner-slider').owlCarousel({
                  loop:true,
                  margin:0,
                  responsiveClass:true,
                  nav: false,
                  pagination: false,
                  navigation:false,
                  autoplay: flag,
                  autoplayTimeout: 5000,
                  smartSpeed: 2000,
                  slideSpeed: 1800,
                  mouseDrag: false,
                  dots: false,
                  autoplayHoverPause:true,
                  responsive: true,
                  items: 1,
                  responsive:{
                  0:{
                        items:1,
                        nav:false
                  },
                  600:{
                        items:1,
                        nav:false
                  },
                  1000:{
                        items:1,
                        loop:true,
                        nav:false
                  }
                 }
      });
}

var swiper = new Swiper('.winners-swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 60,
     loop: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 120,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
  },
  });

 
    var mySwiper = new Swiper('.nomination-swiper-container', {
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: false,
      observer: true,
      observeParents: true,
      autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      479: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 100
      },
    },
  });

// @Ravi's JS

     // sliderInit();
     function sliderInit() {
       // jury slider here
       $(".jury-slider").owlCarousel({
         loop: true,
         margin: 10,
         responsiveClass: true,
         nav: false,
         pagination: true,
         navigation: false,
         autoplay: true,
         smartSpeed: 2000,
         slideSpeed: 1800,
         mouseDrag: false,
         dots: false,
         responsive: true,
         items: 1,
         responsive: {
           0: {
             items: 1,
             nav: false,
           },
           600: {
             items: 1,
             nav: false,
           },
           1000: {
             items: 1,
             nav: false,
             loop: true,
           },
         },
       });
       var owl = $(".jury-slider");
       owl.owlCarousel();
     
       $(".jury-logo-slider").owlCarousel({
         loop: true,
         rtl: true,
         margin: 10,
         responsiveClass: true,
         nav: false,
         pagination: false,
         navigation: false,
         autoplay: true,
         smartSpeed: 2000,
         slideSpeed: 1800,
         mouseDrag: false,
         dots: false,
         responsive: true,
         items: 1,
         responsive: {
           0: {
             items: 1,
             nav: false,
           },
           600: {
             items: 1,
             nav: false,
           },
           1000: {
             items: 1,
             loop: true,
           },
         },
       });
       var owl = $(".jury-logo-slider");
       owl.owlCarousel();
       var nominationCarousel = $(".nomination-slider");
       nominationCarousel.owlCarousel({
         loop: true,
         margin: 20,
         responsiveClass: true,
         nav: true,
         pagination: false,
         navText: [
           "<i class='fa fa-angle-left'></i>",
           "<i class='fa fa-angle-right'></i>",
         ],
         autoplay: true,
         smartSpeed: 2000,
         slideSpeed: 1800,
         mouseDrag: false,
         dots: false,
         responsive: true,
         items: 4,
         responsive: {
           0: {
             items: 1,
             nav: true,
           },
           600: {
             items: 2,
             nav: true,
           },
           1000: {
             items: 4,
             nav: true,
           },
         },
       });
      //  nominationCarousel.on('translated.owl.carousel', function(event) {
      //     loadMoreNominations();
      // })
    
       var loop=0;
     
      
       $(".partner-slider").owlCarousel({
         loop: true,
         margin: 15,
         responsiveClass: true,
         nav: false,
         pagination: false,
         navigation: false,
         autoplay: true,
         smartSpeed: 2000,
         slideSpeed: 1800,
         mouseDrag: false,
         dots: false,
         responsive: true,
         items: 4,
         responsive: {
           0: {
             items: 1,
             nav: false,
           },
           600: {
             items: 3,
             nav: false,
           },
           1000: {
             items: 4,
           },
         },
       });


       this.onload = function () {
         AOS.init({
           duration: 1000,
         });
       };
   
     }

    //  $(".winners-swiper-container").on("mouseenter", function (e) {
      
    //    swiper.autoplay.stop();
    //  });
    //  $(".winners-swiper-container").on("mouseleave", function (e) {
       
      
    //    swiper.autoplay.stop();
    //  });
    //  $(".winners-swiper-container").on("mouseleave", function (e) {
    
    //    swiper.autoplay.start();
    //  });
    

     function getApiData() {
       var apiUrl = `/api`;

      //  var apiUrl = `http://localhost:3001/api`;
     // var apiUrl = `https://awards.channelier.com/api`;
       fetch(`${apiUrl}/getUserNewSlider/${limit}/${currentPage}`, {
         method: "get",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
       })
         .then(function (data) {
           data.json().then((jsondata) => {
             if (jsondata.sliderData.length > 0) {
               jsondata.sliderData.forEach(function (item, i) {
                 userData += addUsers(item);
               });

               $(".custom_swiper").append(userData);
             }
           });
         })
         .catch(function (error) {
           console.log(error);
         });
     }
    function  sliderFunction2() {
       
        // var request1 = $.ajax({
        //   type: "GET",
        //   url: `${apiUrl}/getUserNewSlider/${limit}/${currentPage}`,
        // });
        // request1.done(function (data) {
          //get-user-slider
         
          
        // });
       
          
        setTimeout(function () {
          sliderInit();
        }, 2000);
}

 sliderFunction2();
 getApiData();


       function addUsers(data) {
         
        //  console.log(data);
         var template = ` <div class="swiper-slide"><div class="nomination-box">
       <div class="nomination_logo">
        <img loading='lazy' src=${"https://awards.channelier.com"+data.companyLogo} alt="company-logo">
       </div>
       <div class="nomination_product">
        <img loading='lazy' src=${"https://awards.channelier.com"+data.productLogo} alt="product-logo">
       </div>
       <div class="nomination-detail">
         <h2>${data.companyName}​​​​​​​</h2>
       </div>
       <div class="nomination-border">
          <img src="./images/nomination_border.png" width="210" height="46" alt="logo"/>
       </div>
   </div></div>`;
         return template;
       }

const loadMoreNominations = () => {
  ++currentPage;
  getApiData();
}

var browser = function() {
  // Return cached result if avalible, else get result then cache it.
  if (browser.prototype._cachedResult)
      return browser.prototype._cachedResult;

  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;

  return browser.prototype._cachedResult =
      isOpera ? 'Opera' :
      isFirefox ? 'Firefox' :
      isSafari ? 'Safari' :
      isChrome ? 'Chrome' :
      isIE ? 'IE' :
      isEdge ? 'Edge' :
      isBlink ? 'Blink' :
      "";
};

const videoBackground = document.getElementById("videoBackground")
const browserName = browser();

if(browserName === 'Safari')  {
  videoBackground.hidden = true;
  const body = document.getElementsByTagName('body');
  body[0].classList.add('video-bg-substitute');
}
