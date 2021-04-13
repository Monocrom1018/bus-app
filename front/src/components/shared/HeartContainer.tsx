import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getLikeIds } from '@selectors';
import { userLikes } from '@atoms';
import { useMutation } from 'react-query';
import { createLike, deleteLike } from '@api';
import { toast } from '@js/utils.js';
import { Like } from '@constants';

interface HeartContainerProps {
  targetType: string;
  targetId: number;
  targetLikesCount?: number;
  className?: string;
  heartClassName?: string;
  countClassName?: string;
}

const HeartContainer = ({
  targetType,
  targetId,
  targetLikesCount,
  className,
  heartClassName,
  countClassName,
}: HeartContainerProps) => {
  const [likesCount, setLikesCount] = useState<number>(targetLikesCount || 0);
  const targetLikes: Like[] = useRecoilValue(getLikeIds(targetType));
  const setUserLikes = useSetRecoilState(userLikes);
  const { mutate: createMutate } = useMutation(createLike());
  const { mutate: deleteMutate } = useMutation(deleteLike());

  const onClickLike = () => {
    const targetLike = targetLikes.find((like: Like) => like.target_id === targetId);
    const likeToast = toast.get();
    if (targetLike) {
      deleteMutate(targetLike.id, {
        onSuccess: async (data) => {
          await setLikesCount((count) => count - 1);
          await setUserLikes((likes: Like[]) =>
            _.reject(likes, (like: Like) => like.target_type === data.target_type && like.target_id === data.target_id),
          );
          likeToast.setToastIcon('heart').setToastText('취소했습니다').openIconToast();
        },
      });
    } else {
      createMutate(
        { target_type: targetType, target_id: targetId },
        {
          onSuccess: async (data) => {
            await setLikesCount((count) => count + 1);
            await setUserLikes((likes: Like[]) => [...likes, data]);
            likeToast
              .setToastIcon('heart_fill')
              .setToastText(`${i18next.t(targetType.toLocaleLowerCase())} 좋아요 목록에 추가되었습니다`)
              .openIconToast();
          },
        },
      );
    }
  };

  return (
    <div className={className}>
      <a onClick={onClickLike} className={heartClassName}>
        <i
          className={
            (targetLikes.map((like: Like) => like.target_id).includes(targetId) && 'las la-heart') || 'lar la-heart'
          }
        />
      </a>
      {countClassName && <p className={countClassName}>{likesCount || 0}</p>}
    </div>
  );
};

export default HeartContainer;
