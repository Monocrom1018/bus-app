// import { FileData, S3Image, S3ImageBase, S3Level } from '@constants';
// import { Storage } from 'aws-amplify';
// import { f7 } from 'framework7-react';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { v4 as uuidV4 } from 'uuid';

// const singleInputProps = {
//   type: 'file',
//   accept: 'image/jpg,image/png,image/jpeg',
//   style: {
//     display: 'none',
//   },
// };

// const multipleInputProps = {
//   type: 'file',
//   accept: 'image/jpg,image/png,image/jpeg',
//   multiple: 'multiple',
//   style: {
//     display: 'none',
//   },
// };

// export type AddImageHandler = (images: FileData[]) => void;
// export type RemoveImageHandler = (key: string, removedS3Image?: S3Image) => void;

// export interface useImageStorageProps {
//   initialData?: S3Image[];
//   maxCount?: number;
//   isMultiple: boolean;
//   addImageHandler: AddImageHandler;
//   removeImageHandler: RemoveImageHandler;
//   level?: S3Level;
// }

// const toSafeFileName = (fileName: string) => fileName.replace(/ /g, '');

// const useS3Uploader = ({
//   initialData = [],
//   isMultiple = false,
//   maxCount = 1,
//   addImageHandler,
//   removeImageHandler,
//   level = 'public',
// }: useImageStorageProps) => {
//   const [data, setData] = useState<FileData[]>([]);
//   const [s3Images, setS3Images] = useState<S3Image[]>(initialData);

//   const inputRef = useRef<HTMLInputElement>(null);
//   const openBrowserHandler = useCallback(() => {
//     inputRef.current?.click();
//   }, []);

//   const progressCallback = useCallback(
//     async (fileName: string, id: string, process: ProgressEvent) => {
//       if (process.loaded === process.total) {
//         const image = { key: `${id}/${fileName}`, level };
//         setData((prev) => prev.map((v) => (v.fileName === fileName ? { ...v, key: image.key, isUploaded: true } : v)));
//       }
//     },
//     [level],
//   );

//   useEffect(() => {
//     addImageHandler(data);
//   }, [data]);

//   const uploadDataToS3 = useCallback(
//     (file: File) => {
//       const id = uuidV4();
//       const fileName = toSafeFileName(file.name);
//       Storage.put(`origins/${id}/${fileName}`, file, {
//         level,
//         progressCallback: (progress: ProgressEvent) => progressCallback(fileName, id, progress),
//       });
//     },
//     [level, progressCallback],
//   );
//   const onRemoveHandler: RemoveImageHandler = useCallback(
//     (imageKey) => {
//       if (inputRef.current) inputRef.current.value = '';

//       const removedS3Image = s3Images.find(({ key }) => imageKey === key);

//       if (removedS3Image) {
//         setS3Images((prev) => prev.filter((image) => imageKey !== image.key));
//       } else {
//         setData((prev) => (isMultiple ? prev.filter(({ key }) => imageKey !== key) : []));
//       }

//       removeImageHandler(imageKey, removedS3Image);
//     },
//     [isMultiple, removeImageHandler],
//   );

//   const onChangeHandler = useCallback(
//     ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
//       if (!files) return;
//       const fileList = Array.from(files);

//       const fileData: FileData[] = fileList.map((file) => ({
//         fileName: toSafeFileName(file.name),
//         key: '',
//         previewSrc: URL.createObjectURL(file),
//         isUploaded: false,
//       }));

//       setData((prev) => {
//         if (!isMultiple) {
//           const file = fileList[0];
//           if (!file) return [];
//           if (s3Images.length) {
//             onRemoveHandler(s3Images[0].key);
//           } else if (data.length) {
//             onRemoveHandler(data[0].key);
//           }

//           uploadDataToS3(file);

//           return fileData;
//         }
//         if (prev.length + fileList.length + s3Images.length > maxCount) {
//           f7.dialog.alert(`이미지는 최대 ${maxCount}장 까지만 등록 가능합니다`);
//           return prev;
//         }

//         fileList.forEach((file) => {
//           if (!file) return;
//           uploadDataToS3(file);
//         });

//         return [...prev, ...fileData];
//       });
//     },
//     [isMultiple, maxCount, uploadDataToS3, s3Images],
//   );

//   const inputProps = isMultiple ? multipleInputProps : singleInputProps;

//   return {
//     data,
//     inputRef,
//     openBrowserHandler,
//     onRemoveHandler,
//     onChangeHandler,
//     inputProps,
//     s3Images,
//   };
// };

// export default useS3Uploader;
