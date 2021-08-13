import React, { useCallback, useImperativeHandle, useRef } from 'react';
import { Storage } from 'aws-amplify';
import { Swiper, SwiperSlide, Preloader, f7 } from 'framework7-react';
import { SwiperOptions } from 'swiper';
import { ImagableModel, S3Image, S3OldImage, S3ImagePickerRef, S3ImageBase, ImageType } from '@interfaces';
import { FormikErrors, FormikHelpers, useFormik } from 'formik';
import { AmplifyStorageLevel } from '@constants';
import S3ImageComponent from '@components/shared/S3Image';
import { createImageAPI, destroyImageAPI } from '@api';

const singleInputProps = {
  type: 'file',
  accept: 'image/*',
  style: {
    display: 'none',
  },
};

const multipleInputProps = {
  type: 'file',
  accept: 'image/*',
  multiple: 'multiple',
  style: {
    display: 'none',
  },
};

const swiperDefaultProps: SwiperOptions = {
  spaceBetween: 10,
  observer: true,
  freeMode: true,
  freeModeSticky: true,
  width: 120,
  height: 120,
};

interface S3ImagePickerProps {
  isMultiple: boolean;
  imagable_type: ImagableModel;
  uuid: string;
  level?: AmplifyStorageLevel;
  initialImages?: S3Image[];
  maxCount?: number;
  containerClassName?: string;
  deleteButtonComponent?: React.ReactNode;
  placeholderComponent: React.ReactElement;
  setParentFormFieldValue?: (field: 'imageCount', value: number) => Promise<void> | Promise<FormikErrors<unknown>>;
}

type S3NewImage = {
  fileName: string;
  key: string;
  previewSrc: string;
  isUploaded: boolean;
  image_type: ImageType;
};

interface S3ImageValues {
  newImages: S3NewImage[];
  oldImages: S3OldImage[];
}

type ProgressCallback = (imageKey: string, safeFileName: string, progress: ProgressEvent) => void;

const toSafeFileName = (fileName: string) => fileName.replace(/ /g, '');

const buildImageKey = (
  imagable_type: ImagableModel,
  imageId: string | number,
  image_type: ImageType,
  fileName: string,
) => `${imagable_type}/${imageId}/${image_type}/${fileName}`;

const uploadImageToS3 = (imageKey: string, file: File, safeFileName: string, progressCallback: ProgressCallback) => {
  Storage.put(`origins/${imageKey}`, file, {
    level: 'public',
    progressCallback: (progress: ProgressEvent) => progressCallback(imageKey, safeFileName, progress),
  });
};

const S3ImagePicker: React.ForwardRefRenderFunction<S3ImagePickerRef, S3ImagePickerProps> = (
  {
    initialImages = [],
    containerClassName = '',
    maxCount = 1,
    isMultiple,
    imagable_type,
    // imagable_id,
    setParentFormFieldValue,
    uuid,
    ...props
  },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const openBrowserHandler = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onSubmitHandler = useCallback(
    async (values: S3ImageValues, helpers: FormikHelpers<S3ImageValues>) => {
      const imagesToDelete = values.oldImages.map((v) => v.destroy);
      const imagesToCreate = values.newImages.map(({ key, image_type }) => ({
        key,
        image_type,
        uuid,
        imagable_type,
      }));

      if (imagesToCreate.length + imagesToDelete.length === 0) return;

      const fd = new FormData();

      imagesToCreate.forEach((image) => {
        fd.append(`image[][key]`, image.key);
        fd.append(`image[][image_type]`, image.image_type);
        fd.append(`image[][uuid]`, image.uuid);
        fd.append(`image[][imagable_type]`, image.imagable_type);
      });
      if (imagesToCreate.length) await createImageAPI(fd);

      // TODO
      // if (imagesToDelete.length) await destroyImageAPI();
    },
    [imagable_type, uuid],
  );

  const {
    values: { newImages, oldImages },
    setValues: setImages,
    submitForm,
  } = useFormik<S3ImageValues>({
    initialValues: { oldImages: initialImages.map((v) => ({ ...v, destroy: false })), newImages: [] },
    onSubmit: onSubmitHandler,
  });

  const progressCallback = useCallback(
    async (imageKey: string, safeFileName: string, progress: ProgressEvent) => {
      if (progress.loaded === progress.total) {
        const image: S3ImageBase = {
          key: imageKey,
          level: 'public',
          image_type: isMultiple ? 'normal' : 'main',
        };
        setImages((prev) => {
          if (setParentFormFieldValue)
            setParentFormFieldValue('imageCount', prev.oldImages.length + prev.newImages.length);
          return {
            ...prev,
            newImages: prev.newImages.map((v) =>
              v.fileName === safeFileName ? { ...v, key: image.key, isUploaded: true } : v,
            ),
          };
        });
      }
    },
    [isMultiple, setImages, setParentFormFieldValue],
  );

  const onChangeHandler = useCallback(
    ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!files) return;
      const newImageFiles = Array.from(files);
      const image_type: ImageType = isMultiple ? 'normal' : 'main';

      const newImageDatas = newImageFiles.map((file) => ({
        image_type,
        fileName: toSafeFileName(file.name),
        key: '',
        previewSrc: URL.createObjectURL(file),
        isUploaded: false,
      }));

      if (!isMultiple) {
        const newImageData = newImageDatas[0];
        const imageKey = buildImageKey(imagable_type, uuid, image_type, newImageData.fileName);
        uploadImageToS3(imageKey, files[0], newImageData.fileName, progressCallback);
        setImages((prev) => ({ ...prev, newImages: [...prev.newImages, newImageData] }));
        return;
      }

      setImages((prev) => {
        if (prev.newImages.length + prev.oldImages.length + newImageFiles.length > maxCount) {
          f7.dialog.alert(`이미지는 최대 ${maxCount}장 까지만 등록 가능합니다`);
          return prev;
        }

        newImageFiles.forEach((file, index) => {
          if (!file) return;
          const { fileName } = newImageDatas[index];
          const imageKey = buildImageKey(imagable_type, uuid, image_type, fileName);
          uploadImageToS3(imageKey, file, fileName, progressCallback);
        });

        return { ...prev, newImages: [...prev.newImages, ...newImageDatas] };
      });
      if (inputRef.current) inputRef.current.value = '';
    },
    [imagable_type, isMultiple, maxCount, progressCallback, setImages, uuid],
  );

  const onRemoveNewImageHandler = useCallback(
    (imageKey: string) => {
      if (!isMultiple) {
        setImages({ newImages: [], oldImages: [] });
        if (setParentFormFieldValue) setParentFormFieldValue('imageCount', 0);
        return;
      }

      setImages((prev) => {
        const _newImages = prev.newImages.filter(({ key }) => imageKey !== key);
        if (setParentFormFieldValue) setParentFormFieldValue('imageCount', prev.oldImages.length + _newImages.length);
        return { ...prev, newImages: _newImages };
      });
    },
    [isMultiple, setImages, setParentFormFieldValue],
  );

  const onDestroyOldImageHandler = (imageId: number) => {};

  useImperativeHandle(ref, () => ({
    submit: submitForm,
    reset: () => setImages({ newImages: [], oldImages: [] }),
  }));

  const renderSingleImageView = () => (
    <div className={containerClassName}>
      <div onClick={openBrowserHandler} className="w-full h-full rounded-2xl overflow-hidden">
        {newImages.length === 0 && oldImages.length === 0 && props.placeholderComponent}
        {newImages.length === 1 && <img src={newImages[0].previewSrc} className="w-full h-full" alt="" />}
        {oldImages.length === 1 && <S3ImageComponent imageKey={oldImages[0].key} />}
      </div>
      {newImages.length !== 0 && (
        <div onClick={() => onRemoveNewImageHandler(newImages[0].key)}>{props.deleteButtonComponent}</div>
      )}
    </div>
  );

  return (
    <>
      <input {...(isMultiple ? multipleInputProps : singleInputProps)} onChange={onChangeHandler} ref={inputRef} />
      {renderSingleImageView()}
    </>
  );
};

export default React.memo(React.forwardRef(S3ImagePicker));
