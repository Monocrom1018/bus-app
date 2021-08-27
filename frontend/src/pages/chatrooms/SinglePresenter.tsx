import {
  Actions,
  ActionsButton,
  ActionsGroup,
  Icon,
  Link,
  Message,
  Messagebar,
  MessagebarSheet,
  MessagebarSheetItem,
  Messages,
  MessagesTitle,
  Navbar,
  NavRight,
  Page,
  Preloader,
} from 'framework7-react';
import 'moment/locale/ko';
import React from 'react';
import { getMessageParameters, sendAtFormat, isSameDate } from '@utils/messagesUtils';
import moment from 'moment';
import sanitizeHtml from '@js/utils/sanitizeHtml';

const SinglePresenter = ({
  room_id,
  sheetVisible,
  messageText,
  setMessageText,
  setSheetVisible,
  title,
  sendMessage,
  messagesRef,
  lastMessageRef,
  currentUser,
  chatroom,
  messages,
  hasNextPage,
  targetRef,
}) => (
  <Page noToolbar>
    <Navbar backLink sliding={false} title={title}>
      <NavRight>
        <Link className="las la-ellipsis-h" actionsOpen="#actions-two-groups" />
      </NavRight>
    </Navbar>
    <Actions id="actions-two-groups">
      <ActionsGroup className="bg-white">
        <ActionsButton>채팅방 나가기</ActionsButton>
        {/* <ActionsButton>신고하기</ActionsButton>
        <ActionsButton>차단하기</ActionsButton>
        <ActionsButton>채팅방 알림 해제 하기</ActionsButton> */}
      </ActionsGroup>
      <ActionsGroup>
        <ActionsButton color="red" bold>
          닫기
        </ActionsButton>
      </ActionsGroup>
    </Actions>
    <Messagebar
      placeholder=""
      sheetVisible={sheetVisible}
      className={`messagebar-${room_id}`}
      value={messageText}
      onInput={(e) => setMessageText(e.target.value)}
    >
      <Link
        iconIos="f7:arrow_up_circle_fill"
        iconAurora="f7:add_circle"
        iconMd="material:send"
        slot="inner-end"
        onClick={sendMessage}
      />
    </Messagebar>

    {messages?.length && chatroom && (
      <Messages className="mx-2" ref={messagesRef}>
        {hasNextPage && (
          <div className="flex justify-center" ref={targetRef}>
            <Preloader size={16} />
          </div>
        )}
        {messages.map((message, index) => {
          const nextMessage = message[index + 1];
          const previousMessage = messages[index - 1];
          const isPrevPageLastMessage = index === 20 || messages.length === index + 1;

          return (
            <React.Fragment key={message.id}>
              {!isSameDate(message, previousMessage, nextMessage) && (
                <MessagesTitle>{moment(message.createdAt).format('LL')}</MessagesTitle>
              )}
              <Message
                key={message.id}
                image={message.image}
                {...getMessageParameters({
                  message,
                  previousMessage,
                  nextMessage,
                  users: chatroom.users,
                  currentUserId: currentUser.id,
                })}
                ref={isPrevPageLastMessage ? lastMessageRef : null}
              >
                {message.text && <span slot="text">{sanitizeHtml(message.text)}</span>}
                <div slot="end" className="mx-1 text-gray-400 text-xs">
                  {Number(message.view) > 0 && message.view}
                  <br />
                  {sendAtFormat(message)}
                </div>
              </Message>
            </React.Fragment>
          );
        })}
      </Messages>
    )}
  </Page>
);

export default React.memo(SinglePresenter);
