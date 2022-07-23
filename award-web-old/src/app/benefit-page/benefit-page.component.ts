import { Component, OnInit,  } from '@angular/core';


declare var Swiper:any;
@Component({
  selector: 'app-benefit-page',
  templateUrl: './benefit-page.component.html',
  styleUrls: ['./benefit-page.component.css']
})


export class BenefitPageComponent implements OnInit {
 
  constructor() { }

  ngOnInit() {
   
      var swiper = new Swiper ('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 60,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: false,
          loop: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      });
    
   
  }



}
