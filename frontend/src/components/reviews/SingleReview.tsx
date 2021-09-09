import moment from 'moment';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const SingleReview = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div className="p-4 border-b-2">
          <div className="flex justify-between">
            <StarRatingComponent
              name="rating"
              editing={false}
              starCount={5}
              value={review.rating}
              starColor="#FF3A30"
              emptyStarColor="#AAAAAA"
            />
            <div className="text-gray-500">
            {`${moment(review.createdAt).format('YYYY/MM/DD')}`}
            </div>
          </div>
          <div className="mt-1">{review.content}</div>
        </div>
      ))}
    </div>
  )
};

export default SingleReview;