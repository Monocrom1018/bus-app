import { List, AccordionContent, ListItem } from 'framework7-react';
import React from 'react';

const ScheduleDisplay = ({ tourSchedule, isOpen }) => (
  <div>
    {tourSchedule.map((schedule, index) => (
      <List accordionList key={schedule.departureDate} className="-mt-4">
        <ListItem accordionItem title={schedule.day} accordionItemOpened={isOpen}>
          <AccordionContent>
            <div className="mt-2">
              <div className="flex px-4 mb-2">
                <div className="f7-icons text-base mr-1">arrow_right</div>
                <input className="pl-3 h-8 flex-1 rounded-lg bg-gray-50" value={schedule.departure} disabled />
              </div>
            </div>
            {schedule.stopOvers &&
              schedule.stopOvers.map((stopOver) => (
                <div className="flex px-4 py-2" key={stopOver.id}>
                  <div className="f7-icons text-base mr-1">placemark</div>
                  <input className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50" value={stopOver?.region} disabled />
                </div>
              ))}
            <div className="flex px-4 my-2">
              <div className="f7-icons text-base mr-1">arrow_left</div>
              <input className="pl-3 h-8 flex-1 rounded-lg bg-gray-50" value={schedule.destination} disabled />
            </div>
          </AccordionContent>
        </ListItem>
      </List>
    ))}
  </div>
);

export default ScheduleDisplay;
