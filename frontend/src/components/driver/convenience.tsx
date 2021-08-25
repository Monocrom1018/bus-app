import React from 'react';

const Convenience = (driver) => (
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
);

export default Convenience;
