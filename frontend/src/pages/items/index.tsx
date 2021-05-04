import { Navbar, NavTitle, NavRight, Link, Page, Fab, Icon, List, ListItem, ListInput, Badge } from 'framework7-react';
import React, { useRef, useState } from 'react';
import { API_URL, getObject, getInfiniteItems } from '@api';
import { useQuery, useInfiniteQuery, useQueryClient } from 'react-query';

import { useFormik } from 'formik';
import HeartContainer from '@components/shared/HeartContainer';
import { currency } from '@js/utils';
import { useRecoilValue } from 'recoil';
import { lineItemsCount } from '@atoms';

const ItemIndexPage = ({ f7route }) => {
  const { is_main, category_id } = f7route.query;
  const [viewType, setViewType] = useState('grid');
  const [totalCount, setTotalCount] = useState(0);
  const allowInfinite = useRef(true);
  const queryClient = useQueryClient();
  const ITEM_INF_KEY = ['items/infinite', category_id * 1];
  const cartCount = useRecoilValue(lineItemsCount);

  const { data: category, status, error } = useQuery(
    ['category', parseInt(category_id, 10)],
    getObject({
      id: category_id,
      model_name: 'category',
    }),
    {
      enabled: !!category_id,
    },
  );

  const filterForm = useFormik({
    initialValues: {
      s: '',
      category_id_eq: category_id,
    },
    onSubmit: async (values) => {
      await queryClient.removeQueries(ITEM_INF_KEY);
      await refetch();
      allowInfinite.current = true;
    },
  });

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching, refetch } = useInfiniteQuery(
    ITEM_INF_KEY,
    getInfiniteItems({ q: filterForm.values }),
    {
      getNextPageParam: (lastPage) => lastPage.next_cursor,
    },
  );

  const loadMore = async () => {
    if (!allowInfinite.current) return;
    allowInfinite.current = false;
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
      allowInfinite.current = true;
    }
  };

  const onRefresh = async (done) => {
    await queryClient.removeQueries(ITEM_INF_KEY);
    await refetch();
    allowInfinite.current = true;
    done();
  };

  return (
    <Page
      infinite
      noToolbar={!is_main}
      infinitePreloader={isFetchingNextPage}
      onInfinite={loadMore}
      onPtrRefresh={onRefresh}
      ptr
    >
      <Fab position="right-bottom" href="#">
        <Icon ios="f7:plus" aurora="f7:plus" md="material:add" />
      </Fab>
      <Navbar backLink={!is_main}>
        <NavTitle>{(category && category.title) || '쇼핑'}</NavTitle>
        <NavRight>
          <Link href="/line_items" iconF7="cart" iconBadge={cartCount} badgeColor="red" />
        </NavRight>
      </Navbar>

      <form onSubmit={filterForm.handleSubmit} className="item-list-form p-3 table w-full border-b">
        <div className="float-left">
          총 <b>{currency(totalCount)}</b>개 상품
        </div>
        <ListInput
          type="select"
          className="float-right float-right inline-flex items-center px-2.5 py-3 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          name="s"
          onChange={(e) => {
            filterForm.handleChange(e);
            filterForm.submitForm();
          }}
          value={filterForm.values.s}
        >
          {_.map(i18next.t('sort').item, (v, k) => (
            <option value={k} key={k}>
              {v}
            </option>
          ))}
        </ListInput>
        <ListInput
          type="select"
          defaultValue="grid"
          className="float-right inline-flex items-center px-2.5 py-3 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
          onChange={(e) => setViewType(e.target.value)}
        >
          {_.map(i18next.t('ui'), (v, k) => (
            <option value={k} key={k}>
              {v}
            </option>
          ))}
        </ListInput>
      </form>
      <List noHairlines className="mt-0 text-sm font-thin ">
        {data && (
          <ul>
            {viewType === 'list'
              ? data.pages.map((page, i) => (
                  <React.Fragment key={i}>
                    {page.items.map((item) => (
                      <ListItem
                        key={item.id}
                        mediaItem
                        link={`/items/${item.id}`}
                        title={`${item.id}-${item.name}`}
                        subtitle={`${currency(item.sale_price)}원`}
                        className="w-full"
                      >
                        {/* <HeartContainer heartClassName="absolute z-50 text-base right-1 top-1 red" /> */}
                        <img slot="media" src={API_URL + item.image_path} className="w-20 rounded" />
                      </ListItem>
                    ))}
                  </React.Fragment>
                ))
              : data.pages.map((page, i) => (
                  <React.Fragment key={i}>
                    {page.items.map((item) => (
                      <React.Fragment key={item.id}>
                        <div className="w-1/2 inline-flex grid-list-item relative">
                          <ListItem
                            mediaItem
                            link={`/items/${item.id}`}
                            title={`${item.id}-${item.name}`}
                            subtitle={`${currency(item.sale_price)}원`}
                            header={category_id ? category?.title : false}
                            className="w-full"
                          >
                            <img
                              slot="media"
                              src={API_URL + item.image_path}
                              className="w-40 m-auto radius rounded shadow"
                            />
                          </ListItem>
                          <HeartContainer
                            targetType="Item"
                            targetId={item.id}
                            heartClassName="absolute z-50 right-5 top-3 text-red-500 text-2xl"
                          />
                        </div>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
          </ul>
        )}
      </List>
    </Page>
  );
};

export default ItemIndexPage;
