import { S3Image } from '@interfaces';
import useS3Uploader, { AddImageHandler, RemoveImageHandler } from '@hooks/useS3ImageUploader';
import React from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'framework7-react';
import S3ImageView from './S3ImageView';

const swiperDefaultProps: SwiperOptions = {
  spaceBetween: 10,
  observer: true,
  freeMode: true,
  freeModeSticky: true,
  navigation: true,
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

const S3MultiImagePicker: React.FC<ImagePickerProps> = ({
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
      <Swiper {...swiperDefaultProps}>
        {(data.length && (
          <>
            {data.map(({ previewSrc, key, isUploaded }, index) => (
              <SwiperSlide className="relative">
                <div className="image-slide" key={key}>
                  <img
                    src={previewSrc}
                    alt=""
                    className={`image-slide-image ${isUploaded ? '' : 'image-slide-image-uploading'}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '40vh',
                      objectFit: 'cover',
                    }}
                  />
                  {!isUploaded && <>로딩중</>}
                  {/* <Preloader size={26} /> */}
                  <div
                    className="image-slide-delete-btn absolute top-3 right-3"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      onRemoveHandler(key);
                    }}
                  >
                    {deleteButtonComponent}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </>
        )) ||
          null}
        {(s3Images.length && (
          <>
            {s3Images.map(({ key }, index) => (
              <SwiperSlide className="relative">
                <div className="image-slide" key={key}>
                  {(s3Images?.length && <S3ImageView imageKey={s3Images[index]?.key} className="w-full h-full" />) ||
                    null}
                  <div
                    className="image-slide-delete-btn absolute top-3 right-3"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      onRemoveHandler(key);
                    }}
                  >
                    {deleteButtonComponent}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </>
        )) ||
          null}
        {data.length + s3Images.length < maxCount && (
          <SwiperSlide style={{ height: '40vh', width: '100%' }}>
            <div
              className="image-slide flex-col gap-y-1.5 rounded-md text-gray-600 text-center"
              onClick={openBrowserHandler}
              style={{ marginTop: '10vh' }}
            >
              {placeholderComponent}
              {data.length + s3Images.length} / <span className="text-current">{maxCount}</span>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <input {...inputProps} onChange={onChangeHandler} ref={inputRef} />
    </>
  );
};

export default React.memo(S3MultiImagePicker);
