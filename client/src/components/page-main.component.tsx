/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {
  Button,
  Divider,
  Image,
  Space,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { offers } from '../template-data';

export const MainPageComponent = () => {
  const scrollToSection = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  return (
    <div>
      <SliderComponent scrollToSection={scrollToSection} />
      <span ref={scrollToSection}></span>
      <MultipleSliderComponent />
    </div>
  );
};

const SliderComponent = ({ scrollToSection }: any) => {
  const { token } = theme.useToken();
  return (
    <section style={{ position: 'relative' }}>
      <ScrollArrowHintComponent scrollToSection={scrollToSection} />
      <Swiper
        id='main-slider-container'
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
            <SwiperSlide id='main-slider-slide'>
              <div className='slider-popup-container'>
                <div className='slider-popup'>
                  <Typography.Title
                    style={{
                      margin: 0,
                      marginBottom: 15,
                      color: token.colorPrimary,
                    }}
                    level={2}
                  >
                    40% Mega discount
                  </Typography.Title>
                  <Divider dashed style={{ margin: 5, padding: 0 }} />
                  <div className='popup-decoration'>
                    <Typography.Title style={{ margin: 0 }} level={4}>
                      MEGAWEEK
                    </Typography.Title>
                  </div>

                  <Divider dashed style={{ margin: 5, padding: 0 }} />
                  <Typography.Paragraph
                    style={{
                      margin: 0,
                      marginTop: 20,
                      marginBottom: 10,
                      padding: 0,
                    }}
                  >
                    Some description goes here MEGAWEEK lalala it is really good
                  </Typography.Paragraph>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      type='primary'
                      color={token.colorPrimary}
                      style={{
                        paddingInline: '4em',
                        fontWeight: 600,
                        color: token.colorPrimaryActive,
                      }}
                    >
                      I WANT IT
                    </Button>
                    <Tooltip title='Valid until 20.08.2098'>
                      <InfoCircleFilled
                        style={{
                          color: token.colorPrimaryActive,
                          fontSize: '1.5em',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          margin: 'auto 0',
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <img
                alt='pizza'
                src={
                  'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                }
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const MultipleSliderComponent = () => {
  const { token } = theme.useToken();
  return (
    <section
      style={{ backgroundColor: token.colorPrimaryBg, padding: '5em 10em' }}
    >
      <Swiper
        slidesPerView={4}
        grabCursor={true}
        spaceBetween={30}
        modules={[Navigation]}
        navigation={true}
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <Space
              style={{
                backgroundColor: token.colorPrimaryBgHover,
                paddingBottom: '2em',
              }}
              direction='vertical'
              align='center'
            >
              <Image src={offer.img} />
              <Typography.Title level={5}>{offer.title}</Typography.Title>
              <Typography.Paragraph>{offer.description}</Typography.Paragraph>
              <Button type='primary'>GET THIS DEAL!</Button>
            </Space>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const ScrollArrowHintComponent = ({ scrollToSection }: any) => {
  const scrollDown = () => {
    window.scrollTo({
      top: scrollToSection.current.offsetTop,
      behavior: 'smooth',
    });
  };
  return (
    <div id='section04' onClick={() => scrollDown()}>
      <a>
        <span></span>
      </a>
    </div>
  );
};
