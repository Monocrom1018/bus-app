import { Storage } from 'aws-amplify';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import defaultImg from '@assets/images/placeholder.png';

interface S3FileViewProps {
  fileKey?: string;
  level?: 'public' | 'private' | 'protected';
  className?: string;
  onClick?: (params: unknown) => void;
}

const S3FileView: React.FC<S3FileViewProps> = ({ fileKey, className, onClick, level = 'public' }) => {
  const [preSignedUrl, setPreSignedUrl] = useState('');

  const getStorageFile = useCallback(async () => {
    const url = await Storage.get(`files/${fileKey}`, { level });
    if (typeof url === 'string') setPreSignedUrl(url);
  }, [fileKey, level]);

  useEffect(() => {
    if (!fileKey) return;
    getStorageFile();
  }, [getStorageFile, fileKey]);

  const renderFile = useCallback(() => {
    if (!fileKey) {
      return (
        <a href={defaultImg} download className="flex items-center">
          <AiOutlineFilePdf size="32" />
          <span>not found</span>
        </a>
      );
    }

    return (
      <a href={preSignedUrl} download className="flex items-center">
        <AiOutlineFilePdf size="32" />
        <span>{fileKey?.split('/')[1]}</span>
      </a>
    );
  }, [fileKey, preSignedUrl]);

  return (
    <div ref={undefined} className={className} onClick={onClick}>
      {renderFile()}
    </div>
  );
};

export default React.memo(S3FileView);
