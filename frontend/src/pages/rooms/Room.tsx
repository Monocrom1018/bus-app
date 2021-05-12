import React from 'react';
import { ListItem } from 'framework7-react';

const Room = () => {
  const a = 'test';
  const currentDate = new Date();

  return (
    <ListItem link={`/rooms/1`} noChevron>
      <div className="grid grid-cols-10 grid-flow-col p-1">
        <img
          slot="media"
          src="https://cdn.framework7.io/placeholder/fashion-88x88-3.jpg"
          width="44"
          className="col-span-2 rounded-xl pt-1"
        />
        <div className="col-span-8 room-body">
          <h4 className=" font-bold text-lg">김예시 기사님</h4>
          <p className="text-base text-gray-700">채팅 마지막 문자내용</p>
        </div>
        <div className="time-after col-span-2 text-gray-400 text-base">{`${currentDate.getHours()} : ${currentDate.getMinutes()}`}</div>
      </div>
    </ListItem>
  );
};

export default Room;
