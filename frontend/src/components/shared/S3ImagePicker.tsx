import { S3Image } from '@constants';
import useS3Uploader, { AddImageHandler, RemoveImageHandler } from '@hooks/useS3Uploader';
import { Preloader, Swiper, SwiperSlide } from 'framework7-react';
import React from 'react';
import { SwiperOptions } from 'swiper';
import S3ImageView from './S3ImageView';

const swiperDefaultProps: SwiperOptions = {
  spaceBetween: 10,
  observer: true,
  freeMode: true,
  freeModeSticky: true,
  width: 120,
  height: 120,
};

interface ImagePickerProps {
  initialData?: S3Image[];
  containerClassName?: string;
  deleteButtonComponent?: React.ReactElement;
  placeholderComponent: React.ReactElement;
  addImageHandler: AddImageHandler;
  removeImageHandler: RemoveImageHandler;
  isMultiple: boolean;
  maxCount?: number;
}

const S3ImagePicker: React.FC<ImagePickerProps> = ({
  initialData = [],
  isMultiple,
  placeholderComponent,
  deleteButtonComponent,
  containerClassName = '',
  maxCount = 1,
  addImageHandler,
  removeImageHandler,
}) => {
  const { s3Images, data, inputProps, openBrowserHandler, onRemoveHandler, onChangeHandler, inputRef } = useS3Uploader({
    initialData,
    isMultiple,
    level: 'public',
    addImageHandler,
    maxCount,
    removeImageHandler,
  });
  return (
    <>
      <input {...inputProps} onChange={onChangeHandler} ref={inputRef} />
      {isMultiple ? (
        <Swiper {...swiperDefaultProps}>
          <SwiperSlide>
            <div className="image-slide" onClick={openBrowserHandler}>
              {placeholderComponent}
              <div className="image-slide-count">
                {data.length + s3Images.length} / <span className="text-current">{maxCount}</span>
              </div>
            </div>
          </SwiperSlide>
          {data.map(({ previewSrc, key, isUploaded }) => (
            <SwiperSlide key={previewSrc}>
              <div className="image-slide">
                <img
                  src={previewSrc}
                  alt=""
                  className={`image-slide-image ${isUploaded ? '' : 'image-slide-image-uploading'}`}
                />
                {!isUploaded && <Preloader size={26} />}
                <div className="image-slide-delete-btn" onClick={() => onRemoveHandler(key)}>
                  {deleteButtonComponent}
                </div>
              </div>
            </SwiperSlide>
          ))}
          {s3Images?.map(({ key }) => (
            <SwiperSlide key={key}>
              <div className="image-slide">
                <S3ImageView imageKey={key} className="image-slide-image" />
                <div className="image-slide-delete-btn" onClick={() => onRemoveHandler(key)}>
                  {deleteButtonComponent}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={containerClassName}>
          <div onClick={openBrowserHandler} className="w-full h-full rounded-2xl overflow-hidden">
            {(data.length && <img src={data[0].previewSrc} className="w-full h-full" alt="" />) || null}
            {(s3Images.length && <S3ImageView imageKey={s3Images[0].key} className="w-full h-full" />) || null}
            {(!data.length && !s3Images.length && placeholderComponent) || null}
          </div>
          {(data.length && (
            <div className="image-slide-delete-btn" onClick={() => onRemoveHandler(data[0].key)}>
              {deleteButtonComponent}
            </div>
          )) ||
            (s3Images.length && (
              <div className="image-slide-delete-btn" onClick={() => onRemoveHandler(s3Images[0].key)}>
                {deleteButtonComponent}
              </div>
            )) ||
            null}
        </div>
      )}
    </>
  );
};

export default React.memo(S3ImagePicker);
