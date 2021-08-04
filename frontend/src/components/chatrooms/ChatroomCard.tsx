import React from 'react';
import { ListItem } from 'framework7-react';
import { Router } from 'framework7/types';
import { MessageType, Chatroom } from '@constants';
import { API_URL } from '@api';
import { useQuery } from 'react-query';
// import { getMessageListQuery } from '@appsync';
import moment from 'moment';
import { getMessageListQuery } from '../../common/appsync/index';

interface ChatroomCardProps {
  f7router: Router.Router;
  chatroom: Chatroom;
  isEdit: boolean;
}

const ChatroomCard = ({ f7router, chatroom, isEdit }: ChatroomCardProps) => {
  const {
    data: lastMessage,
    status,
    error,
  } = useQuery<MessageType[]>(
    `last-message-${chatroom.id}`,
    getMessageListQuery({ room_id: chatroom.id, order: 'DESC', limit: 1 }),
  );
  return (
    <ListItem
      checkbox={isEdit}
      key={chatroom.id}
      title={chatroom.name}
      text={lastMessage?.length && lastMessage[0].text}
      onClick={() => {
        if (!isEdit) f7router.navigate(`/chatrooms/${chatroom.id}${chatroom.room_type === 'single' ? '/single' : ''}`);
      }}
      after={moment(lastMessage?.length && lastMessage[0].createdAt, 'YYYY-MM-DD hh:mm:ss').fromNow()}
      className="mx-0"
    >
      {chatroom ? (
        <img slot="media" src={API_URL + chatroom.avatar} alt="user_image" className="h-12 w-12 rounded-full" />
      ) : (
        <i slot="media" className="las la-user-circle text-6xl text-gray-500 -mx-1 -my-2" />
      )}
    </ListItem>
  );
};

export default ChatroomCard;
