import React from 'react';
import { f7, Page, Navbar, NavLeft, Link, NavTitle, Block, BlockTitle, Button, Icon } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@atoms';
import Footer from '@components/shared/Footer';
import usePostBillingProcess from '@hooks/usePostBillingProcess';
import { useQuery } from 'react-query';
import { sleep } from '@js/utils';
import ReactQueryState from '@components/shared/ReactQueryState';
import Driver from './users/Driver';
import { getDriversByRegion } from '@api';

const HomePage = ({ f7route, f7router }) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  usePostBillingProcess(f7route.query, setCurrentUser);

  const { status, data, error, refetch, isFetching } = useQuery('driversByRegion', async () => {
    const currentCoordinates = { x: '126.975817', y: '37.553881' };
    const { x, y } = currentCoordinates;
    const response = await getDriversByRegion(x, y);
    return response.data;
  });

  const onRefresh = async (done) => {
    refetch();
    await sleep(500);
    done();
  };

  return (
    <Page name="home" className="home-page" ptr ptrMousewheel onPtrRefresh={onRefresh}>
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>배낭버스</NavTitle>
      </Navbar>
      <Block className="p-4 my-8">
        <Button
          className="justify-start h-12 rounded-2xl bg-gray-300 text-black"
          onClick={() => f7.tab.show('#view-search', true)}
        >
          <p>검색</p>
          <Icon className="searchbar-icon right-4" style={{ left: 'unset' }} />
        </Button>
      </Block>
      <Block className="border-t-2 pt-8">
        <BlockTitle className="text-center text-xl font-bold">내 주변 추천 기사님들</BlockTitle>
        <ReactQueryState data={data} status={status} error={error} isFetching={isFetching} />
         {data && (
            <div>
              {data.map((driver) => (
                <Driver driver={driver} key={`driver-${driver.id}`} />
              ))}
            </div>
          )}
      </Block>
      <Footer />
    </Page>
  );
};
export default HomePage;
