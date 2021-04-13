import React from 'react';
import { API_URL, getObjects } from '@api';
import { Preloader, List, ListItem } from 'framework7-react';
import { useQuery } from 'react-query';
import { currency } from '@js/utils';
import HeartContainer from '@components/shared/HeartContainer';

const NewItems = () => {
  const { data, isLoading, isError, isFetching } = useQuery(
    'items',
    getObjects({
      model_name: 'item',
      q: { s: ['created_at desc'] },
    }),
  );

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
      <div className="mt-2 px-3 block text-lg leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
        최신 상품
      </div>
      <List noHairlines className="mt-0 text-sm font-thin ">
        {data && (
          <ul>
            {_.map(data.objects, (item) => (
              <React.Fragment key={item.id}>
                <div className="w-1/2 inline-flex grid-list-item relative">
                  <ListItem
                    mediaItem
                    key={item.id}
                    link={'/items/' + item.id}
                    title={item.id + '-' + item.title}
                    subtitle={currency(item.sale_price) + '원'}
                    className="w-full"
                  >
                    <img
                      slot="media"
                      src={API_URL + item.image_path}
                      className="w-40 m-auto radius rounded shadow-sm"
                    />
                  </ListItem>
                  <HeartContainer
                    targetId={item.id}
                    targetType="Item"
                    heartClassName="absolute z-50 right-5 top-3 text-red-500 text-2xl"
                  />
                </div>
              </React.Fragment>
            ))}
          </ul>
        )}
      </List>
    </>
  );
};

export default NewItems;
