import React, { useEffect, useState } from 'react';
import { f7, Page, Navbar, Button, List, ListItem, AccordionContent, ListInput, Tabs, Link, Tab } from 'framework7-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { driverState, searchingOptionState, totalChargeState, tourScheduleState } from '@atoms';
import useAuth from '@hooks/useAuth';
import ScheduleDisplay from '@components/schedule/ScheduleDisplay';
import ScheduleTimeDisplay from '@components/schedule/ScheduleTimeDisplay';
import { showToast } from '@js/utils';
import BusOption from '@components/driver/BusOption';
import { createReservation, createSchedules, getOneDriver, getReviews } from '../common/api/index';
import SingleReview from '@components/reviews/SingleReview';

const DriverDetailPage = ({ id, f7router }) => {
  const { totalDistance, people } = useRecoilValue(searchingOptionState);
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const { departureDate, departureTime, returnDate, returnTime } = useRecoilValue(searchingOptionState);
  const [driver, setDriver] = useRecoilState(driverState);
  const tourSchedule = useRecoilValue(tourScheduleState);
  const totalCharge = useRecoilValue(totalChargeState);
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([])

  const handleSubmit = async () => {
    if (currentUser.card_registered === false) {
      f7.dialog.confirm('등록된 카드가 없습니다. 등록하시겠어요?', () => f7router.navigate('/users/card'));
      return;
    }

    if (people === null) {
      showToast('탑승인원을 입력해주세요');
      return;
    }

    f7.preloader.show();
    let message: string;
    try {
      const params = {
        userEmail: currentUser.email,
        driverId: Number(id),
        totalDistance,
        totalCharge,
        people: Number(people),
        departureDate,
        departureTime,
        returnDate,
        returnTime,
      };

      const reservationData = await createReservation(params);
      await createSchedules({ reservationId: reservationData.id, tourSchedule });

      message = '기사님께 예약이 전달되었습니다';
    } catch (error) {
      if (typeof error.message === 'string') message = error.message;
      else message = '예상치 못한 오류가 발생하였습니다';
    } finally {
      f7.preloader.hide();
      f7.dialog.alert(message, () => window.location.replace('/'));
    }
  };

  useEffect(() => {
    async function getTargetDriver() {
      const targetDriver = await getOneDriver(id);
      const { data: reviews } = await getReviews(id);
      setReviews(reviews);
      setDriver(targetDriver);
    }
    getTargetDriver();
  }, [id, setDriver]);

  const showButton = (isAuthenticated: boolean, charge: number) => {
    if (isAuthenticated && charge) {
      return (
        <div className="fixed bottom-0 z-50 w-full bg-white pt-1 pb-4">
          <div className="flex flex-row justify-between text-lg font-semibold tracking-wider mx-4 -mb-3">
            <div>요금 총액</div>
            <div>{charge?.toLocaleString()}₩</div>
          </div>
          <Button
            text="견적 전달하기"
            className="bg-red-500 text-white mt-6 mx-4 h-10 text-lg"
            onClick={handleSubmit}
          />
        </div>
      );
    }
    if (isAuthenticated && !charge) {
      return (
        <Button disabled href="#" fill outline className="py-5 mx-4 font-bold text-lg tracking-wide">
          일정을 입력하고 견적을 전달해보세요
        </Button>
      );
    }
    if (!isAuthenticated) {
      return (
        <Button href="/users/sign_up/intro" fill outline className="py-5 mx-4 font-bold text-lg tracking-wide">
          회원가입 하고 이용하기
        </Button>
      );
    }
    return false;
  };

  return (
    <Page noToolbar name="driverdetail">
      {/* Top Navbar */}
      <Navbar title="기사정보" backLink />
      {/* Page Content */}
      <img
        src="https://images.unsplash.com/photo-1592071241777-b1e32bbe3590?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1788&q=80"
        alt="logo"
      />
      <div className="py-5 divide-solid">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <img className="h-24 w-24 rounded-2xl" src={driver.profile} alt="driver_profile" />
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-xl font-bold text-gray-900">{driver.name}</h1>
              <p className="mt-1 text-xs font-medium text-gray-500">
                {driver.bus.bus_old}년식 | {driver.bus.people_available}인승 {driver.bus.bus_type}
              </p>
              <p className="mt-1 text-xs font-medium text-gray-500">{driver.company_name}</p>
            </div>
          </div>
          <hr />
          <div className="mt-5 mx-4 flex items-center space-x-5 italic text-center">
            {driver.introduce ||
              '항상 웃음띤 얼굴로 고객을 대하며 친절과 안전운행으로 처음부터 끝까지 최선을 다하겠습니다.'}
          </div>
        </div>
      </div>

      <div className="toolbar tabbar">
        <div className="toolbar-inner">
          <Link tabLink="#tab-1" tabLinkActive>견적</Link>
          <Link tabLink="#tab-2">리뷰({reviews.length})</Link>
        </div>
      </div>

      <Tabs>
        <Tab id="tab-1" tabActive>
          <div className="mx-4 mt-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">편의시설</div>
          <div className="flex flex-col mb-10 mt-3">
            <BusOption bus={driver.bus} />
          </div>

          {totalCharge && (
          <div>
            <div className="mx-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">나의일정</div>
            <div className="flex flex-col -mt-6">
              <ScheduleTimeDisplay
                departureDate={departureDate}
                departureTime={departureTime}
                returnDate={returnDate}
                returnTime={returnTime}
              />
              <ScheduleDisplay tourSchedule={tourSchedule} isOpen />
            </div>

            <div className="mx-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">탑승인원</div>
            <List noHairlinesMd className="mt-3 pt-0">
              <ListInput
                type="text"
                placeholder="탑승인원을 숫자만 입력해주세요"
                clearButton
                onChange={(e) => setSearchingOption({ ...searchingOption, people: e.target.value })}
                value={people}
              />
            </List>
          </div>)}
          <div className="mx-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">Q&A</div>
          <List accordionList className="mt-3 pb-10">
            <ListItem accordionItem title="기사님과 연락은 어떻게 할 수 있나요?">
              <AccordionContent>
                <div className="px-4 py-3">
                  <p>견적신청 후 기사님과 본 앱을 통해 채팅하실 수 있습니다.</p>
                </div>
              </AccordionContent>
            </ListItem>
          </List>

          {currentUser.isAuthenticated && totalCharge ? (
            <div className="fixed bottom-0 z-50 w-full bg-white pt-1 pb-4">
              <div className="flex flex-row justify-between text-lg font-semibold tracking-wider mx-4 -mb-3">
                <div>요금 총액</div>
                <div>{totalCharge?.toLocaleString()}₩</div>
              </div>
              <Button
                text="견적 전달하기"
                className="bg-red-500 text-white mt-6 mx-4 h-10 text-lg"
                onClick={handleSubmit}
              />
            </div>
          ) : (
            <Button disabled href="#" fill outline className="py-5 mx-4 font-bold text-lg tracking-wide">
              일정을 입력하고 견적을 전달해보세요
            </Button>
          )}

          {!currentUser.isAuthenticated && (
            <Button href="/users/sign_up/intro" fill outline className="py-5 mx-4 font-bold text-lg tracking-wide">
              회원가입 하고 이용하기
            </Button>
          )}
        </Tab>

        <Tab id="tab-2">
          { reviews.length > 0 ? (
            <SingleReview reviews={reviews} />
            ) : (
              <div className="text-center mt-16">
                <i className="f7-icons text-6xl text-gray-400">pencil_slash</i>
                <div className="text-lg text-gray-400 mt-4 tracking-wide">작성된 리뷰가 없습니다</div>
              </div>
            )
          }
        </Tab>
      </Tabs>
    </Page>
  );
};

export default DriverDetailPage;
