import { S3File } from '@interfaces';
import useS3FileUploader, { AddFileHandler, RemoveFileHandler } from '@hooks/useS3FileUploader';
import React from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';

interface FilePickerProps {
  initialData?: S3File[];
  containerClassName?: string;
  deleteButtonComponent?: React.ReactElement;
  placeholderComponent: React.ReactElement;
  addFileHandler: AddFileHandler;
  removeFileHandler: RemoveFileHandler;
  isMultiple: boolean;
  maxCount?: number;
}

const S3MultiFilesPicker: React.FC<FilePickerProps> = ({
  initialData = [],
  isMultiple,
  placeholderComponent,
  deleteButtonComponent,
  containerClassName = '',
  maxCount = 1,
  addFileHandler,
  removeFileHandler,
}) => {
  const { s3Files, data, inputProps, openBrowserHandler, onRemoveHandler, onChangeHandler, inputRef } =
    useS3FileUploader({
      initialData,
      isMultiple,
      level: 'public',
      addFileHandler,
      maxCount,
      removeFileHandler,
    });
  // `grid-cols-5`
  return (
    <>
      <input {...inputProps} onChange={onChangeHandler} ref={inputRef} />
      <div className={containerClassName}>
        <div className={`grid grid-cols-${maxCount} gap-6`}>
          {(data.length &&
            data.map(({ previewSrc, key, isUploaded }) => (
              <div className="image-slide image-small rounded-md bg-gray-200 rounded-md relative" key={previewSrc}>
                <div
                  className={`image-slide-image flex justify-center cursor-pointer align-center ${
                    isUploaded ? '' : 'image-slide-image-uploading'
                  }`}
                >
                  <div className="flex justify-center items-center break-all p-4 w-full h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    {isUploaded ? key.split('/')[1] : '로딩중'}
                  </div>
                </div>
                <div
                  className="image-slide-delete-btn absolute -top-2 -right-3"
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    onRemoveHandler(key);
                  }}
                >
                  {deleteButtonComponent}
                </div>
              </div>
            ))) ||
            null}
          {(s3Files.length &&
            s3Files?.map(({ key }) => (
              <div className="image-slide image-small rounded-md bg-gray-200 cursor-pointer relative" key={key}>
                <div className="flex justify-center items-center p-4 break-all w-full h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  {key?.split('/')[1]}
                </div>
                <div className="image-slide-delete-btn absolute -top-2 -right-3" onClick={() => onRemoveHandler(key)}>
                  {deleteButtonComponent}
                </div>
              </div>
            ))) ||
            null}
          {data.length + s3Files.length < maxCount && (
            <div
              className="image-slide image-small flex-col gap-y-1.5 border-2 border-gray-300 rounded-md text-gray-600 cursor-pointer"
              onClick={openBrowserHandler}
            >
              <div className="flex flex-col justify-center items-center w-full h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                <AiOutlineFileAdd size={50} />
                <>파일 추가</>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(S3MultiFilesPicker);
