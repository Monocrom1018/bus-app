import React from 'react';
import { API_URL, getObjects } from '@api';
import { Link, Preloader } from 'framework7-react';
import { useQuery } from 'react-query';

const Categories = () => {
  const { data, isLoading, isError, isFetching } = useQuery('categories', getObjects({ model_name: 'category' }));

  if (isLoading || isFetching) {
    return (
      <div className="h-32 flex items-center justify-center">
        <Preloader size={20} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-32 flex items-center justify-center">
        <span className="text-gray-400">서버에 문제가 발생 했습니다. </span>
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 grid grid-cols-4 gap-2 p-2">
        {data.objects.map(({ title, image_path, id }) => (
          <Link
            href={`/items?category_id=${id}`}
            className="bg-white h-20 flex flex-col items-center justify-center"
            key={id}
          >
            <img src={API_URL + image_path} alt="#" className="w-14 h-14 rounded-lg shadow-sm" />
            <span className="text-gray-500 mt-1">{title}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
