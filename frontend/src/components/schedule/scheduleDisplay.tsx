import { List, ListInput, AccordionContent, ListItem } from 'framework7-react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import moment from 'moment';
import { searchingOptionState, tourScheduleState } from '@atoms';

const ScheduleDisplay = () => {
  const { departureDate, departureTime, returnDate, returnTime } = useRecoilValue(searchingOptionState);
  const tourSchedule = useRecoilValue(tourScheduleState);

  return (
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
  );
};

export default ScheduleDisplay;
