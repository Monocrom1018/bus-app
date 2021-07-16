import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper, f7ready } from 'framework7-react';
import { getImages, API_URL } from '@api';

const ImagesSlide = (props) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    f7ready(async (f7) => {
      const { data } = await getImages({
        q: { imagable_type_eq: props.imagable_type, imagable_id_eq: props.imagable_id },
      });
      setImages(data);
    });
  }, [props.imagable_id, props.imagable_type]);

  return (
    <Swiper pagination speed={500} slidesPerView={1} spaceBetween={10} observer loop>
      {images.map((v, i) => (
        <SwiperSlide key={v.id}>
          <img src={`${API_URL + v.image_path}`} alt="" className="open-photo-browser width-100" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default ImagesSlide;
