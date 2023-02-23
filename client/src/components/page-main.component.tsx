import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { Card, Typography } from 'antd';

export const MainPageComponent = () => {
  const scrollToSection = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  return (
    <div style={{ position: 'relative' }}>
      <ScrollArrowHintComponent scrollToSection={scrollToSection} />
      <SliderComponent />
      <div ref={scrollToSection}></div>
    </div>
  );
};

const SliderComponent = () => {
  return (
    <Swiper
      loop={true}
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
          <SwiperSlide>
            <Card className='slider-popup-container'>
              <Typography.Title level={4}>40% Mega discount</Typography.Title>
            </Card>
            <img
              alt='pizza'
              src={
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
              }
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

const ScrollArrowHintComponent = ({ scrollToSection }: any) => {
  const scrollDown = () => {
    window.scrollTo({
      top: scrollToSection.current.offsetTop - 125,
      behavior: 'smooth',
    });
  };
  return (
    <div id='section04'>
      <a onClick={() => scrollDown()}>
        <span></span>
      </a>
    </div>
  );
};
