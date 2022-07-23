import React, { useRef, useState } from 'react';

// Import Swiper React components

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import './Slider.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

// product of the year images

import prod1 from '../../../../assets/img/winners/product_year/1.png';
import prod2 from '../../../../assets/img/winners/product_year/2.png';
import prod3 from '../../../../assets/img/winners/product_year/3.png';
import prod4 from '../../../../assets/img/winners/product_year/4.png';
import prod5 from '../../../../assets/img/winners/product_year/5.png';
import prod6 from '../../../../assets/img/winners/product_year/6.png';
import prod7 from '../../../../assets/img/winners/product_year/7.png';
import prod8 from '../../../../assets/img/winners/product_year/8.png';
import prod9 from '../../../../assets/img/winners/product_year/9.png';
import prod10 from '../../../../assets/img/winners/product_year/10.png';
import prod11 from '../../../../assets/img/winners/product_year/11.png';
import prod12 from '../../../../assets/img/winners/product_year/12.png';
import prod13 from '../../../../assets/img/winners/product_year/13.png';
import prod14 from '../../../../assets/img/winners/product_year/14.png';
import prod15 from '../../../../assets/img/winners/product_year/15.png';
import prod16 from '../../../../assets/img/winners/product_year/16.png';
import prod17 from '../../../../assets/img/winners/product_year/17.png';
import prod18 from '../../../../assets/img/winners/product_year/18.png';
import prod19 from '../../../../assets/img/winners/product_year/19.png';
import prod20 from '../../../../assets/img/winners/product_year/20.png';
import prod21 from '../../../../assets/img/winners/product_year/21.png';
import prod22 from '../../../../assets/img/winners/product_year/22.png';
import prod23 from '../../../../assets/img/winners/product_year/23.png';
import prod24 from '../../../../assets/img/winners/product_year/24.png';
import prod25 from '../../../../assets/img/winners/product_year/25.png';
import prod26 from '../../../../assets/img/winners/product_year/26.png';
import prod27 from '../../../../assets/img/winners/product_year/27.png';
import prod28 from '../../../../assets/img/winners/product_year/28.png';
import prod29 from '../../../../assets/img/winners/product_year/29.png';
import prod30 from '../../../../assets/img/winners/product_year/30.png';
import prod31 from '../../../../assets/img/winners/product_year/31.png';
import prod32 from '../../../../assets/img/winners/product_year/32.png';

// product launch of the year category images
import launch1 from '../../../../assets/img/winners/product_launch/1.png';
import launch2 from '../../../../assets/img/winners/product_launch/2.png';
import launch3 from '../../../../assets/img/winners/product_launch/3.png';
import launch4 from '../../../../assets/img/winners/product_launch/4.png';
import launch5 from '../../../../assets/img/winners/product_launch/5.png';
import launch6 from '../../../../assets/img/winners/product_launch/6.png';
import launch7 from '../../../../assets/img/winners/product_launch/7.png';
import launch8 from '../../../../assets/img/winners/product_launch/8.png';
import launch9 from '../../../../assets/img/winners/product_launch/9.png';
import launch10 from '../../../../assets/img/winners/product_launch/10.png';
import launch11 from '../../../../assets/img/winners/product_launch/11.png';
import launch12 from '../../../../assets/img/winners/product_launch/12.png';
import launch13 from '../../../../assets/img/winners/product_launch/13.png';
import launch14 from '../../../../assets/img/winners/product_launch/14.png';
import launch15 from '../../../../assets/img/winners/product_launch/15.png';
import launch16 from '../../../../assets/img/winners/product_launch/16.png';
import launch17 from '../../../../assets/img/winners/product_launch/17.png';
import launch18 from '../../../../assets/img/winners/product_launch/18.png';
import launch19 from '../../../../assets/img/winners/product_launch/19.png';
import launch20 from '../../../../assets/img/winners/product_launch/20.png';

// Brand of the year category images
import brand1 from '../../../../assets/img/winners/brand_year/1.png';
import brand2 from '../../../../assets/img/winners/brand_year/2.png';
import brand3 from '../../../../assets/img/winners/brand_year/3.png';
import brand4 from '../../../../assets/img/winners/brand_year/4.png';
import brand5 from '../../../../assets/img/winners/brand_year/5.png';
import brand6 from '../../../../assets/img/winners/brand_year/6.png';
import brand7 from '../../../../assets/img/winners/brand_year/7.png';
import brand8 from '../../../../assets/img/winners/brand_year/8.png';
import brand9 from '../../../../assets/img/winners/brand_year/9.png';
import brand10 from '../../../../assets/img/winners/brand_year/10.png';
import brand11 from '../../../../assets/img/winners/brand_year/11.png';
import brand12 from '../../../../assets/img/winners/brand_year/12.png';
import brand13 from '../../../../assets/img/winners/brand_year/13.png';
import brand14 from '../../../../assets/img/winners/brand_year/14.png';
import brand15 from '../../../../assets/img/winners/brand_year/15.png';
import brand16 from '../../../../assets/img/winners/brand_year/16.jpeg';
import brand17 from '../../../../assets/img/winners/brand_year/17.jpeg';
import brand18 from '../../../../assets/img/winners/brand_year/18.png';
import brand19 from '../../../../assets/img/winners/brand_year/19.png';
import brand20 from '../../../../assets/img/winners/brand_year/20.png';
import brand21 from '../../../../assets/img/winners/brand_year/21.png';
import brand22 from '../../../../assets/img/winners/brand_year/22.png';

import leftarrow from '../../../../assets/img/leftarrow.png';
import rightarrow from '../../../../assets/img/rightarrow.png';

function Sliders() {
  const [category, setCategory] = useState(0);

  const handleClick = (operation) => {
    if (operation === 'increase') {
      if (category === 2) {
        setCategory(0);
      } else {
        setCategory(category + 1);
      }
    } else if (operation === 'decrease') {
      if (category === 0) {
        setCategory(2);
      } else {
        setCategory(category - 1);
      }
    }
  };
  return (
    <section className='winnerSec' id='2021'>
      <div class='section_title'>
        <h2>Previous winners 2021</h2>
      </div>
      <div className='container'>
        <div className='SwiperSliderDiv'>
          {category === 0 && (
            <Swiper
              centeredSlides={true}
              initialSlide={1}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className='mySwiper1'
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              <SwiperSlide>
                <img src={prod1} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod2} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod3} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod4} alt='prod' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={prod5} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod6} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod7} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod8} alt='prod' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={prod9} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod10} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod11} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod12} alt='prod' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={prod13} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod14} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod15} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod16} alt='prod' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={prod17} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod18} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod19} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod20} alt='prod' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={prod21} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod22} alt='prod' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={prod23} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod24} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod25} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod26} alt='prod' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={prod27} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod28} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod29} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod30} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod31} alt='prod' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={prod32} alt='prod' className='slide-image' />
              </SwiperSlide>
            </Swiper>
          )}

          {category === 1 && (
            <Swiper
              centeredSlides={true}
              initialSlide={1}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className='mySwiper2'
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              <SwiperSlide>
                <img src={launch1} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch2} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch3} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch4} alt='launch' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={launch5} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch6} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch7} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch8} alt='launch' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={launch9} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch10} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch11} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch12} alt='launch' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={launch13} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch14} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch15} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch16} alt='launch' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={launch17} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch18} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch19} alt='launch' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={launch20} alt='launch' className='slide-image' />
              </SwiperSlide>
            </Swiper>
          )}

          {category === 2 && (
            <Swiper
              centeredSlides={true}
              initialSlide={1}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className='mySwiper3'
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              <SwiperSlide>
                <img src={brand1} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand2} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand3} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand4} alt='brand' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={brand5} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand6} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand7} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand8} alt='brand' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={brand9} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand10} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand11} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand12} alt='brand' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={brand13} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand14} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand15} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand16} alt='brand' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={brand17} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand18} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand19} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand20} alt='brand' className='slide-image' />
              </SwiperSlide>

              <SwiperSlide>
                <img src={brand21} alt='brand' className='slide-image' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={brand22} alt='brand' className='slide-image' />
              </SwiperSlide>
            </Swiper>
          )}
        </div>

        <div className='sliderHeading'>
          <span className='arrowLeft' onClick={() => handleClick('decrease')}>
            <img src={leftarrow} alt='prod' />
          </span>
          <h4>
            {category === 0
              ? 'Product of the year'
              : category === 1
              ? 'Product launch of the year'
              : category === 2
              ? 'Brand of the year'
              : ''}
          </h4>
          <span className='arrowRight' onClick={() => handleClick('increase')}>
            <img src={rightarrow} alt='prod' />
          </span>
        </div>
      </div>
    </section>
  );
}

export default Sliders;
