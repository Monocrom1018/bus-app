import React, { useEffect } from 'react';
import { Page, Navbar, NavLeft, NavRight, Link, NavTitle, SwiperSlide, Swiper } from 'framework7-react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userLikes, lineItemsCount, authState } from '@atoms';
import { getLikes, getObjects, API_URL, getLineItems } from '@api';
import Categories from '@components/categories/Categories';
import NewItems from '@components/shared/NewItems';
import MainBanner from '@components/shared/MainBanner';
import { useQuery, useQueryClient } from 'react-query';
import { getRecoilRootState } from '@components/RecoilRootPortal';
import { AuthState } from '@constants';

const HomePage = () => {
  const queryClient = useQueryClient();
  const setUserLikes = useSetRecoilState(userLikes);
  const setLineItemsCount = useSetRecoilState(lineItemsCount);
  const cartCount = useRecoilValue(lineItemsCount);
  const state = getRecoilRootState(authState);
  const { currentUser } = state.contents as AuthState;
  const { data, isLoading, isError, isFetching } = useQuery('notices', getObjects({ model_name: 'notice' }));

  useEffect(() => {
    (async () => {
      const { data } = await getLikes();
      await setUserLikes(data);
      if (currentUser) {
        await queryClient.prefetchQuery('line_items', getLineItems());
        const lineItems: any[] = await queryClient.getQueryData('line_items');
        setLineItemsCount(lineItems.length);
      }
    })();
  }, []);

  return (
    <Page name="home">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>인썸니아</NavTitle>
        <NavRight>
          <Link href="/line_items" iconF7="cart" iconBadge={cartCount} badgeColor="red" />
        </NavRight>
      </Navbar>
      <MainBanner />
      <Categories />
      <div className="mt-2 px-3 block text-lg leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
        오늘의 스토리
      </div>
      {data && (
        <div className="row">
          <Swiper speed={100} slidesPerView={2} spaceBetween={5} observer={true} loop={true}>
            {data.objects.map((notice, i) => (
              <SwiperSlide key={notice.id}>
                <div className="bg-default my-3 mx-3">
                  <div className="background">
                    <img
                      src={`${API_URL + notice.banner_image_path}`}
                      alt=""
                      className="open-photo-browser width-100"
                    />
                  </div>
                  <div className="py-3 font-semibold">{notice.title}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <NewItems />
    </Page>
  );
};
export default HomePage;
