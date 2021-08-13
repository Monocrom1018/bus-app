import React, { useEffect, useState } from 'react';
import { f7, Page, Navbar, Button, List, ListItem, AccordionContent, ListInput } from 'framework7-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { driverState, reservationState, searchingOptionState, totalChargeState, tourScheduleState } from '@atoms';
import useAuth from '@hooks/useAuth';
import { getOneDriver } from '../common/api/index';
import moment from 'moment';
import { createReservation } from '../common/api/index';

const DriverDetailPage = ({ id, f7router }) => {
  const { departureDate, departureTime, returnDate, returnTime, totalDistance, people } =
    useRecoilValue(searchingOptionState);
  const [tourSchedule, setTourSchedule] = useRecoilState(tourScheduleState);
  const [driver, setDriver] = useRecoilState(driverState);
  const [reservation, setReservation] = useRecoilState(reservationState);
  const totalCharge = useRecoilValue(totalChargeState);
  const { currentUser } = useAuth();

  const handleSubmit = async () => {
    if (currentUser.card_registered === false) {
      f7.dialog.confirm('등록된 카드가 없습니다. 등록하시겠어요?', () => f7router.navigate('/users/card'));
      return;
    }

    f7.preloader.show();
    let message: string;
    try {
      // todo : 파라미터 정리해서 createReservation api요청 보내기
      const people = 30;
      const params = {
        userEmail: currentUser.email,
        driverId: driver.id,
        totalDistance: totalDistance,
        totalCharge,
        people,
      };

      const result = await createReservation(params);

      console.log('result');
      console.log(result);

      // todo : 예약 생성했으면 스케쥴 생성하는 api요청 보내기

      // setReservation(result);
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
      setDriver(targetDriver);
    }
    getTargetDriver();
  }, [id, setDriver]);

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
                <img className="h-24 w-24 rounded-2xl" src={driver.profile_img} alt="ddriver_profile_img" />
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-xl font-bold text-gray-900">{driver.name}</h1>
              <p className="mt-1 text-xs font-medium text-gray-500">
                {driver.bus_old}년식 | {driver.people_available}인승 {driver.bus_type}
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

      <hr />

      {/* 편의시설 컴포넌트  ->  todo : 따로 빼서 import 받아오는걸로 수정 */}

      <div className="mx-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">편의시설</div>
      <div className="flex flex-col mb-10 mt-3">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      옵션
                    </th>
                    <th scope="col" className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      포함여부
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">손소독제</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">
                      {driver.sanitizer === true ? '포함' : '미포함'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Wi-Fi</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">
                      {driver.wifi === true ? '포함' : '미포함'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">전좌석 USB포트</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">
                      {driver.usb === true ? '포함' : '미포함'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">냉장고</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">
                      {driver.fridge === true ? '포함' : '미포함'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">영화관람</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">
                      {driver.movie === true ? '포함' : '미포함'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">음향시설</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">
                      {driver.audio === true ? '포함' : '미포함'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">나의일정</div>

      <div className="flex flex-col -mt-6">
        <List className="bg-gray-50">
          <ListInput
            label="가는날 및 탑승시간"
            className="bg-gray-50"
            disabled
            value={
              moment(departureDate).format('YYYY년 MM월 DD일') +
              ' ' +
              `${departureTime[0]}시 ${departureTime[2]}${departureTime[3]}분`
            }
          />
          <ListInput
            label="오는날 및 탑승시간"
            disabled
            className="bg-gray-50"
            value={
              moment(returnDate).format('YYYY년 MM월 DD일') +
              ' ' +
              `${returnTime[0]}시 ${returnTime[2]}${returnTime[3]}분`
            }
          />
        </List>

        {tourSchedule.map((schedule, index) => (
          <List accordionList key={index} className="-mt-4">
            <ListItem accordionItem title={schedule.day} accordionItemOpened>
              <AccordionContent>
                <div className="mt-2">
                  <div className="flex px-4 mb-2">
                    <div className="f7-icons text-base mr-1">arrow_right</div>
                    <input className="pl-3 h-8 flex-1 rounded-lg bg-gray-50" value={schedule.departure} disabled />
                  </div>
                </div>
                <div className="flex px-4 my-2">
                  <div className="f7-icons text-base mr-1">arrow_left</div>
                  <input className="pl-3 h-8 flex-1 rounded-lg bg-gray-50" value={schedule.destination} disabled />
                </div>
                {schedule.stopOvers &&
                  schedule.stopOvers.map((stopOver) => (
                    <div className="flex px-4 py-2" key={stopOver.id}>
                      <div className="f7-icons text-base mr-1">placemark</div>
                      <input className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50" value={stopOver?.region} disabled />
                    </div>
                  ))}
              </AccordionContent>
            </ListItem>
          </List>
        ))}
      </div>

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

      {currentUser.isAuthenticated ? (
        <div className="fixed bottom-0 z-50 w-full bg-white pt-1 pb-4">
          <div className="flex flex-row justify-between text-lg font-semibold tracking-wider mx-4 -mb-3">
            <div>요금 총액</div>
            <div>{totalCharge.toLocaleString()}₩</div>
          </div>
          <Button
            text="견적 전달하기"
            className="bg-red-500 text-white mt-6 mx-4 h-10 text-lg"
            onClick={handleSubmit}
          />
        </div>
      ) : (
        <Button disabled href="#" fill outline className="py-5 mx-4 font-bold text-lg tracking-wide">
          로그인 후 예약 가능합니다
        </Button>
      )}
    </Page>
  );
};

export default DriverDetailPage;
