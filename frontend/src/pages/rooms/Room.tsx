import React from 'react';
import { ListItem } from 'framework7-react';

const Room = () => {
  const a = 'test';
  const currentDate = new Date();

  return (
    <ListItem>
      <div className="grid grid-cols-10 grid-flow-col p-1 pb-4">
        <img
          slot="media"
          src="https://cdn.framework7.io/placeholder/fashion-88x88-3.jpg"
          width="44"
          className="col-span-2 rounded-xl"
        />
        <div className="col-span-6 room-body">
          <h4>기사님</h4>
          <p>채팅 마지막 문자내용</p>
        </div>
        <div className="time-after col-span-2">{`${currentDate.getHours()} : ${currentDate.getMinutes()}`}</div>
      </div>
    </ListItem>
  );
};

export default Room;
