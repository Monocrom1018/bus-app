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
import { createReview } from '@api';

const CreateReviewPage = ({id, f7router}) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const handleReviewButton = async () => {
    f7.preloader.show();
    let message: string;
    try {
      const params = {
        reservationId: id,
        rating: rating,
        content: content,
      };
      await createReview(params);
      message = '리뷰가 작성되었습니다'
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
      <Navbar title={'리뷰남기기'} backLink="Back"></Navbar>

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
          onChange={e => setContent(e.target.value)}
        ></ListInput>
      </List>
      <Button fill className="font-semibold text-base h-10" onClick={handleReviewButton}>
        리뷰남기기
      </Button>
    </Page>
  );
};

export default CreateReviewPage;