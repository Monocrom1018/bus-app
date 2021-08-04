import React, { useState } from 'react';
import { Navbar, NavRight, Page, Icon, List } from 'framework7-react';
import 'moment/locale/ko';
import { useQuery } from 'react-query';
import { getObjects } from '@api';
import { Objects, PageRouteProps, Chatroom } from '@constants';
import useAuth from '@hooks/useAuth';
import ReactQueryState from '@components/shared/ReactQueryState';
import ChatroomCard from '@components/chatrooms/ChatroomCard';

const ChatroomIndexPage = ({ f7route, f7router }: PageRouteProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { currentUser } = useAuth();
  const {
    data: chatrooms,
    status,
    error,
  } = useQuery<Objects<Chatroom>, Error>(
    'chatrooms',
    getObjects({
      model_name: 'chatroom',
    }),
  );

  const chattingEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Page noToolbar>
      <Navbar backLink title="채팅">
        <NavRight>
          <div onClick={chattingEdit}>
            <Icon className="las la-cog w-full mr-3" size="25px" />
          </div>
        </NavRight>
      </Navbar>
      <List mediaList noHairlines className={isEdit ? 'mb-10 mt-1' : 'my-px'}>
        <ReactQueryState data={chatrooms} status={status} error={error} />
        <ul>
          {chatrooms &&
            chatrooms.objects.map((chatroom) => (
              <ChatroomCard key={chatroom.id} f7router={f7router} isEdit={isEdit} chatroom={chatroom} />
            ))}
        </ul>
      </List>
      {isEdit && (
        <div className="z-10 w-full fixed bottom-12 p-3 border-t border-gray-300 bg-gray-100 flex justify-between">
          <button className="border-r focus:outline-none" onClick={chattingEdit}>
            취소
          </button>
          <button className="disabled:opacity-50 focus:outline-none">채팅방 나가기</button>
        </div>
      )}
    </Page>
  );
};

export default React.memo(ChatroomIndexPage);
