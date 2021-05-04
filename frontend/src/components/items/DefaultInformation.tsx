import React from 'react';
import { saleRate, currency } from '@js/utils';

const DefaultInformation = ({ target }) => {
  return (
    target && (
      <div className="price-text text-lg font-bold">
        <span className="text-red-500 font-bold">{saleRate(target) === 0 ? '' : `${saleRate(target)}%`}</span>
        <span className={(saleRate(target) !== 0 && 'ml-2') || ''}>{currency(target.sale_price)}원</span>
        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
          특가
        </span>
      </div>
    )
  );
};

export default DefaultInformation;
