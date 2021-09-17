import React, { useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {
  f7,
  List,
  ListInput,
  Navbar,
  Button,
  Page,
} from 'framework7-react';
import { showToast } from '@js/utils';
import { createReview, getTargetReview, updateReviews } from '@api';
import { useQueryClient } from 'react-query';
import { REACT_QUERY_KEYS } from '@constants';

const EditReviewPage = ({id, f7router}) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  useEffect(() => {
    const getTargetReviewData = async () => {
      const { data: review } = await getTargetReview(id);
      setRating(Number(review.rating));
      setContent(review.content);
    }
    getTargetReviewData();
  }, [])

  const handleReviewButton = async () => {
    let message: string;

    if(content === '') {
      message = '내용을 입력해주세요';
      showToast(message);
      return;
    }

    try {
      f7.preloader.show();
      const params = {
        rating: rating,
        content: content,
      };
      await updateReviews(params, id);
      await queryClient.fetchQuery(REACT_QUERY_KEYS.RESERVATION)
      message = '리뷰가 수정되었습니다'
    } catch (error) {
      if (typeof error.message === 'string') message = error.message;
    } finally {
      f7.preloader.hide();
      showToast(message);
      f7router.back();
    }
  };

  const handleStar = value => {
    setRating(value);
  };

  return (
    <Page name="review" noToolbar className="px-4">
      {/* Top Navbar */}
      <Navbar title={'리뷰 수정'} backLink="Back"></Navbar>

      {/* Page Contents */}

      <div className="flex justify-center">
        <StarRatingComponent
          name="rating"
          starCount={5}
          value={rating}
          onStarClick={handleStar}
          starColor="#FF3A30"
          emptyStarColor="#AAAAAA"
          className="mt-7 text-2xl"
        />
      </div>

      <List mediaList>
        <ListInput
          type="textarea"
          placeholder="버스 이용에 대한 솔직한 리뷰를 남겨주세요"
          required
          defaultValue={content || ''}
          onChange={e => setContent(e.target.value)}
        ></ListInput>
      </List>
      <Button fill className="font-semibold text-base h-10" onClick={handleReviewButton}>
        리뷰남기기
      </Button>
    </Page>
  );
};

export default EditReviewPage;