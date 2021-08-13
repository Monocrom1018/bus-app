import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { f7 } from 'framework7-react';
import { Storage } from 'aws-amplify';
import * as defaultImg from '../../assets/images/profile.png';

interface S3ImageProps {
  imageKey?: string;
  level?: 'public' | 'private' | 'protected';
  isLazyLoad?: boolean;
  className?: string;
  onClick?: (params: unknown) => void;
}

const S3Image = ({ imageKey, className, onClick, isLazyLoad = false, level = 'public' }: S3ImageProps) => {
  const [s3Url, setS3Url] = useState('');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const imageRef = useRef<HTMLImageElement>(null);

  const callback = useCallback(() => {}, []);

  const getStorageImage = useCallback(async () => {
    const url = await Storage.get(`resized/${imageKey}`, { level });
    if (typeof url === 'string') setS3Url(url);
  }, [imageKey, level]);

  const checkImagePresent = useCallback(async () => {
    const imageList = await Storage.list(`resized/${imageKey?.split('/')[0]}`, { level });

    if (imageList instanceof Array && imageList.length === 0) {
      const url = await Storage.get(`origins/${imageKey}`, { level });
      if (typeof url === 'string') setS3Url(url);
    }
  }, [imageKey, level]);

  useEffect(() => {
    if (!imageKey) return;
    getStorageImage();
    checkImagePresent();
  }, [checkImagePresent, getStorageImage, imageKey]);

  useEffect(() => {
    if (!inView || !imageRef.current || !isLazyLoad) return;
    f7.lazy.loadImage(imageRef.current, callback);
  }, [callback, inView, isLazyLoad, s3Url]);

  return (
    <div ref={isLazyLoad ? ref : undefined} className={className} onClick={onClick}>
      {isLazyLoad ? (
        <img ref={imageRef} data-src={s3Url || defaultImg} className="lazy lazy-fade-in" alt="" />
      ) : (
        <img src={s3Url || defaultImg} alt="" />
      )}
    </div>
  );
};

export default S3Image;
