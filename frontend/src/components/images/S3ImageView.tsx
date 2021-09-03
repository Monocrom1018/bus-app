import { Storage } from 'aws-amplify';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import defaultImg from '@assets/images/profile.png';

interface S3ImageViewProps {
  imageKey?: string;
  level?: 'public' | 'private' | 'protected';
  isLazyLoad?: boolean;
  className?: string;
  placeHolderClassName?: string;
  onClick?: (params: unknown) => void;
}

const S3ImageView: React.FC<S3ImageViewProps> = ({
  imageKey,
  className,
  onClick,
  isLazyLoad = false,
  level = 'public',
  placeHolderClassName = '',
}) => {
  const [preSignedUrl, setPreSignedUrl] = useState('');

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
    skip: !isLazyLoad,
  });

  const imageRef = useRef<HTMLImageElement>(null);

  const getStorageImage = useCallback(async () => {
    const url = await Storage.get(`resized/${imageKey}`, { level });
    if (typeof url === 'string') setPreSignedUrl(url);
  }, [imageKey, level]);

  const checkImagePresent = useCallback(async () => {
    if (imageKey) {
      const imageList = await Storage.list(`resized/${imageKey.split('/')[0]}`, { level });
      if (imageList instanceof Array && imageList.length === 0) {
        const url = await Storage.get(`origins/${imageKey}`, { level });
        if (typeof url === 'string') setPreSignedUrl(url);
      }
    }
  }, [imageKey, level]);

  useEffect(() => {
    if (!imageKey) return;
    getStorageImage();
    checkImagePresent();
  }, [checkImagePresent, getStorageImage, imageKey]);

  const renderImage = useCallback(() => {
    if (!imageKey)
      return <img src={defaultImg} alt="me" className={`object-fill w-full h-full ${placeHolderClassName}`} />;
    if (isLazyLoad) return <img ref={imageRef} data-src={preSignedUrl} className="lazy lazy-fade-in" alt="" />;
    return <img src={preSignedUrl} alt="" className={className} />;
  }, [imageKey, isLazyLoad, preSignedUrl]);

  return (
    <div ref={isLazyLoad ? ref : undefined} className={className} onClick={onClick}>
      {renderImage()}
    </div>
  );
};

export default React.memo(S3ImageView);
