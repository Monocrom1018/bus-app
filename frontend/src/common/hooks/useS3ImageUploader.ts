import { flashAtom } from '@atoms';
import { FileData, S3Image, S3Level } from '@interfaces';
import { Storage } from 'aws-amplify';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

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

export type AddImageHandler = (images: FileData[]) => void;
export type RemoveImageHandler = (key: string, removedS3Image?: S3Image) => void;

export interface useImageStorageProps {
  initialData?: S3Image[];
  maxCount?: number;
  isMultiple: boolean;
  addImageHandler: AddImageHandler;
  removeImageHandler: RemoveImageHandler;
  level?: S3Level;
}

const toSafeFileName = (fileName: string) => fileName.replace(/ /g, '');

const useS3Uploader = ({
  initialData = [],
  isMultiple = false,
  maxCount = 1,
  addImageHandler,
  removeImageHandler,
  level = 'public',
}: useImageStorageProps) => {
  const [data, setData] = useState<FileData[]>([]); // 새로 올리는 이미지
  const [s3Images, setS3Images] = useState<S3Image[]>(initialData); // back에서 받아온 이미지정보 배열
  const setFlash = useSetRecoilState(flashAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const openBrowserHandler = useCallback(() => {
    inputRef.current?.click(); // 클릭 이벤트 트리거
  }, []);

  const progressCallback = useCallback(
    async (fileName: string, id: string, process: ProgressEvent) => {
      if (process.loaded === process.total) {
        const image = { key: `${id}/${fileName}`, level };
        setData((prev) => prev.map((v) => (v.fileName === fileName ? { ...v, key: image.key, isUploaded: true } : v)));
      }
    },
    [level],
  );

  useEffect(() => {
    addImageHandler(data);
  }, [data]);

  // s3로 업로드 하는 함수
  const uploadDataToS3 = async (file: File) => {
    const id = uuidV4();
    const fileName = toSafeFileName(file.name);
    Storage.put(`origins/${id}/${fileName}`, file, {
      level,
      progressCallback: (progress: ProgressEvent) => progressCallback(fileName, id, progress),
    });
  };

  // 이미지 삭제 핸들러
  const onRemoveHandler: RemoveImageHandler = useCallback(
    (imageKey) => {
      if (inputRef.current) inputRef.current.value = ''; // 인풋 비우기

      const removedS3Image = s3Images.find(({ key }) => imageKey === key);
      if (removedS3Image) {
        setS3Images((prev) => prev.filter((image) => imageKey !== image.key));
      } else {
        setData((prev) => (isMultiple ? prev.filter(({ key }) => imageKey !== key) : []));
      }

      removeImageHandler(imageKey, removedS3Image); // 컴포넌트에 있는 이미지 삭제 시 핸들러
    },
    [isMultiple, removeImageHandler],
  );

  const onChangeHandler = useCallback(
    ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!files) return;
      const fileList = Array.from(files);

      const fileData: FileData[] = fileList.map((file) => ({
        fileName: toSafeFileName(file.name),
        key: '',
        previewSrc: URL.createObjectURL(file),
        isUploaded: false,
      }));

      setData((prev) => {
        if (!isMultiple) {
          const file = fileList[0];
          if (!file) return [];
          if (s3Images.length) {
            onRemoveHandler(s3Images[0].key);
          } else if (data.length) {
            onRemoveHandler(data[0].key);
          }
          uploadDataToS3(file);
          return fileData;
        }
        if (prev.length + fileList.length + s3Images.length > maxCount) {
          setFlash({
            flashType: 'error',
            body: `이미지는 최대 ${maxCount}장 까지만 등록 가능합니다`,
            isShow: true,
          });
          return prev;
        }

        fileList.forEach((file) => {
          if (!file) return;
          uploadDataToS3(file);
        });

        return [...prev, ...fileData];
      });
    },
    [isMultiple, maxCount, uploadDataToS3, s3Images],
  );

  const inputProps = isMultiple ? multipleInputProps : singleInputProps;

  return {
    data,
    inputRef,
    openBrowserHandler,
    onRemoveHandler,
    onChangeHandler,
    inputProps,
    s3Images,
  };
};

export default useS3Uploader;
