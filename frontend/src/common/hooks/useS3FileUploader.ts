import { flashAtom } from '@atoms';
import { FileData, S3File, S3Level } from '@interfaces';
import { Storage } from 'aws-amplify';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidV4 } from 'uuid';

const singleInputProps = {
  type: 'file',
  accept: '*',
  style: {
    display: 'none',
  },
};

const multipleInputProps = {
  type: 'file',
  accept: '*',
  multiple: 'multiple',
  style: {
    display: 'none',
  },
};

export type AddFileHandler = (files: FileData[]) => void;
export type RemoveFileHandler = (key: string, removedS3File?: S3File) => void;

export interface useImageStorageProps {
  initialData?: S3File[];
  maxCount?: number;
  isMultiple: boolean;
  addFileHandler: AddFileHandler;
  removeFileHandler: RemoveFileHandler;
  level?: S3Level;
}

const toSafeFileName = (fileName: string) => fileName.replace(/ /g, '');

const useS3Uploader = ({
  initialData = [],
  isMultiple = false,
  maxCount = 1,
  addFileHandler,
  removeFileHandler,
  level = 'public',
}: useImageStorageProps) => {
  const [data, setData] = useState<FileData[]>([]); // 얘는 새로 올리는 이미지
  const [s3Files, setS3Files] = useState<S3File[]>(initialData); // 얘는 back에서 받아온 이미지정보 배열
  const setFlash = useSetRecoilState(flashAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const openBrowserHandler = useCallback(() => {
    inputRef.current?.click(); // 클릭 이벤트 트리거
  }, []);

  const progressCallback = useCallback(
    async (fileName: string, id: string, process: ProgressEvent) => {
      if (process.loaded === process.total) {
        const file = { key: `${id}/${fileName}`, level };
        setData((prev) => prev.map((v) => (v.fileName === fileName ? { ...v, key: file.key, isUploaded: true } : v)));
      }
    },
    [level],
  );

  useEffect(() => {
    addFileHandler([...s3Files, ...data]);
  }, [data]);

  // s3로 올리는 함수
  const uploadDataToS3 = async (file: File) => {
    const id = uuidV4();
    const fileName = toSafeFileName(file.name);
    Storage.put(`files/${id}/${fileName}`, file, {
      level,
      progressCallback: (progress: ProgressEvent) => progressCallback(fileName, id, progress),
    });
  };

  // 이미지 삭제 핸들러
  const onRemoveHandler: RemoveFileHandler = useCallback(
    (fileKey) => {
      if (inputRef.current) inputRef.current.value = ''; // 인풋 비우고

      const removedS3File = s3Files.find(({ key }) => fileKey === key); // 삭제할 거 찾고
      if (removedS3File) {
        setS3Files((prev) => prev.filter((image) => fileKey !== image.key));
      } else {
        setData((prev) => (isMultiple ? prev.filter(({ key }) => fileKey !== key) : []));
      }

      // Storage.remove(`origins/${imageKey}`);
      removeFileHandler(fileKey, removedS3File); // 컴포넌트에 있는 이미지 삭제 시 핸들러
    },
    [isMultiple, removeFileHandler],
  );

  // 삭제인지 추가인지 판단후 알맞는 처리
  const onChangeHandler = useCallback(
    ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
      if (!files) return;
      const fileList = Array.from(files); // input 엘리먼트에서 올린 파일 추출

      const fileData: FileData[] = fileList.map((file) => ({
        fileName: toSafeFileName(file.name),
        key: '',
        previewSrc: URL.createObjectURL(file),
        isUploaded: false,
      }));

      setData((prev) => {
        // 단일 이미지 처리
        if (!isMultiple) {
          // 하나의 이미지므로 이전에 올렸던 이미지는 지워야 한다.
          const file = fileList[0];
          if (!file) return [];
          if (s3Files.length) {
            onRemoveHandler(s3Files[0].key);
          } else if (data.length) {
            onRemoveHandler(data[0].key);
          }
          // s3 업로드
          uploadDataToS3(file);
          // 위에서 지정했던 fileData을 data로 지정
          return fileData;
        }
        // 업로드 허용 수 초과 시
        if (prev.length + fileList.length + s3Files.length > maxCount) {
          setFlash({
            flashType: 'error',
            body: `이미지는 최대 ${maxCount}장 까지만 등록 가능합니다`,

            isShow: true,
          });
          // 이전과 동일
          return prev;
        }
        // 멀티 이미지 처리
        fileList.forEach((file) => {
          if (!file) return;
          uploadDataToS3(file);
        });

        return [...prev, ...fileData];
      });
    },
    [isMultiple, maxCount, uploadDataToS3, s3Files],
  );

  // input props 설정 멀티냐 싱글이냐
  const inputProps = isMultiple ? multipleInputProps : singleInputProps;

  return {
    data,
    inputRef,
    openBrowserHandler,
    onRemoveHandler,
    onChangeHandler,
    inputProps,
    s3Files,
  };
};

export default useS3Uploader;
