import { S3Image } from '@interfaces';
import useS3Uploader, { AddImageHandler, RemoveImageHandler } from '@hooks/useS3ImageUploader';
import React from 'react';
import S3ImageView from './S3ImageView';

interface ImagePickerProps {
  initialData?: S3Image[];
  containerClassName?: string;
  deleteButtonComponent?: React.ReactElement;
  placeholderComponent?: React.ReactElement;
  addImageHandler?: AddImageHandler;
  removeImageHandler?: RemoveImageHandler;
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
      <div className={containerClassName}>
        <div onClick={openBrowserHandler} className="max-w-xs m-auto h-full flex items-center justify-center">
          {(data?.length && <img src={data[0]?.previewSrc} className="w-full h-full" alt="" />) || null}
          {(s3Images?.length && <S3ImageView imageKey={s3Images[0]?.key} className="w-full h-full" />) || null}
          {(!data?.length && !s3Images?.length && placeholderComponent) || null}
        </div>
        {(data.length && (
          <div
            className="image-slide-delete-btn inline-block absolute right-8 top-1"
            onClick={() => onRemoveHandler(data[0].key)}
          >
            {deleteButtonComponent}
          </div>
        )) ||
          (s3Images.length && (
            <div
              className="image-slide-delete-btn inline-block absolute right-8 top-1"
              onClick={() => onRemoveHandler(s3Images[0].key)}
            >
              {deleteButtonComponent}
            </div>
          )) ||
          null}
      </div>
    </>
  );
};

export default React.memo(S3ImagePicker);
