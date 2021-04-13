import React from 'react';
import { Preloader } from 'framework7-react';

const ReactQueryState = ({ status, data, error, isFetching = false }) => {
  if (status === 'loading' || isFetching)
    return (
      <div className="text-center p-10">
        <Preloader size={20} />
      </div>
    );
  if (status === 'error')
    return <div className="text-center p-10 text-red-500">Something went wrong {error.message}`</div>;
  if (!data) return <div className="text-center p-10">데이터가 없습니다.</div>;
  return null;
};

export default ReactQueryState;
