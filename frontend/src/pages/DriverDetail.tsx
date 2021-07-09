import React, { useEffect, useState } from 'react';
import { Page, Navbar, Button, List, ListItem, AccordionContent } from 'framework7-react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { totalChargeState, driverState } from '@atoms';
import useAuth from '@hooks/useAuth';
import { getOneDriver } from '../common/api/index';

const DriverDetailPage = (props) => {
  const [driver, setDriver] = useRecoilState(driverState);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function getTargetDriver() {
      const targetDriver = await getOneDriver(props.id);
      setDriver(targetDriver);
    }
    getTargetDriver();
  }, [props.id, setDriver]);

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
                <img className="h-24 w-24 rounded-2xl" src={driver.profile_img} />
                {/* <i className="h-24 w-24 rounded-full las la-user-circle" style={{ fontSize: '96px', color: 'gray' }} /> */}
                {/* <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span> */}
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

      {/* 부대비용 컴포넌트 */}

      <div className="mt-3 mx-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">부대비용</div>
      <div className="flex flex-col mb-6 mt-3">
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
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">톨비</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">주차비</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">식사비</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">숙박비</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">미포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">봉사료</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">부가세(10%)</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">미포함</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 편의시설 컴포넌트 */}

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
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Wi-Fi</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">전좌석 USB포트</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">냉장고</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">미포함</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">영화관람</td>
                    <td className="text-center py-2 whitespace-nowrap text-sm text-gray-500">포함</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 block text-base font-bold tracking-tight text-gray-900 sm:text-4xl">Q&A</div>
      <List accordionList className="mt-3">
        <ListItem accordionItem title="기사님과 연락은 어떻게 할 수 있나요?">
          <AccordionContent>
            <div className="px-4 py-3">
              <p>견적신청 후 기사님과 본 앱을 통해 채팅하실 수 있습니다.</p>
            </div>
          </AccordionContent>
        </ListItem>
      </List>

      {currentUser.isAuthenticated ? (
        <Button href="/drivers/:id/esimate" fill outline className="py-5 mx-4 font-bold text-lg tracking-wide">
          견적 전달하기
        </Button>
      ) : (
        <Button disabled href="#" fill outline className="py-5 mx-4 font-bold text-lg tracking-wide">
          로그인 후 예약 가능합니다
        </Button>
      )}
    </Page>
  );
};

export default DriverDetailPage;
