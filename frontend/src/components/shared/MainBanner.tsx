import React from 'react';
import { API_URL, getObjects } from '@api';
import { Preloader, SwiperSlide, Swiper } from 'framework7-react';
import { useQuery } from 'react-query';

const MainBanner = () => {
  const { data, isLoading, isError } = useQuery('notices', getObjects({ model_name: 'notice' }));

  if (isLoading) {
    return (
      <div className="h-32 flex items-center justify-center">
        <Preloader size={20} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-32 flex items-center justify-center">
        <span className="text-gray-400">서버에 문제가 발생 했습니다. </span>
      </div>
    );
  }

  return (
    <Swiper speed={100} slidesPerView={1} spaceBetween={10} observer loop pagination={{ clickable: true }}>
      {data.objects.map((v, i) => (
        <SwiperSlide key={v.id}>
          <img src={`${API_URL + v.banner_image_path}`} alt="" className="open-photo-browser width-100" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainBanner;
