import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

export const MainPageComponent = () => {
  return (
    <>
      <SliderComponent />
    </>
  );
};

const SliderComponent = () => {
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      centeredSlides={true}
      speed={3000}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
    >
      {Array(3)
        .fill(1)
        .map((item) => (
          <SwiperSlide id='slide'>Slide 1</SwiperSlide>
        ))}
    </Swiper>
  );
};
