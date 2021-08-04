import { createChatroom, createUserChatroom, getChatroom, getUser } from '@api';
import { Chatroom, InfiniteAppSync, MessageType, PageRouteProps, User } from '@constants';
import useAuth from '@hooks/useAuth';

import { API } from 'aws-amplify';
import { f7, f7ready } from 'framework7-react';
import { debounce, find, last } from 'lodash';
import moment from 'moment';
import 'moment/locale/ko';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateMessageInput, CreateNotificationInput } from 'src/API';
// import { createNotification } from '@graphql/mutations';
import { createNotification, createMessage } from '../../graphql/mutations';
// import { getMessageInfiniteQuery, getMessageListQuery, onCreateMessagesSubscription } from '@appsync';
import { getMessageInfiniteQuery, getMessageListQuery, onCreateMessagesSubscription } from '../../common/appsync/index';
import SinglePresenter from './SinglePresenter';

const ChatroomSinglePage = ({ f7route, f7router }: PageRouteProps) => {
  const { id: room_id } = f7route.params;
  const { newChat, user_id } = f7route.query;

  const [sheetVisible, setSheetVisible] = useState(false);
  const [messageText, setMessageText] = useState('');

  const messagebar = useRef(null);
  const messagesRef = useRef(null);
  const lastMessageRef = useRef(null);
  const MESSAGES_KEY = `messages-${room_id}`;
  const RECV_MESSAGES_KEY = `recv${MESSAGES_KEY}`;
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const [opUser, setOpUser] = useState<User | null>(null);
  const { data: chatroom } = useQuery<Chatroom, Error>(`chatroom-${room_id}`, getChatroom(room_id), {
    enabled: !!room_id && room_id !== 'new',
  });
  const { ref: targetRef, inView: isTargetInView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (chatroom) {
      setOpUser(() => find(chatroom.users, (u) => u.id !== currentUser.id));
    } else if (user_id) {
      (async () => {
        const user = await getUser(user_id)();
        setOpUser(() => user);
      })();
    }
  }, [chatroom]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    InfiniteAppSync<MessageType>,
    Error
  >(MESSAGES_KEY, getMessageInfiniteQuery({ room_id }), {
    enabled: room_id !== 'new',
    getNextPageParam: (lastPage) => lastPage.nextToken,
    cacheTime: 0,
    select: (_data) => ({
      pages: [..._data.pages].reverse(),
      pageParams: [..._data.pageParams].reverse(),
    }),
  });

  const { data: recvData, refetch } = useQuery<any>(
    RECV_MESSAGES_KEY,
    getMessageListQuery({
      room_id,
      order: 'ASC',
      filter: {
        createdAt: {
          gt: moment([...(data?.pages[0]?.items || [])].pop()?.createdAt)
            .utc()
            .format(),
        },
      },
    }),
    {
      enabled: room_id !== 'new',
      placeholderData: [],
      cacheTime: 0,
    },
  );
  const messages = [...(data?.pages.flatMap((v) => v.items) || []), ...(recvData || [])];

  const createMessageMutation = useMutation<any, any, CreateMessageInput>(async (message) => {
    const response = await API.graphql({ query: createMessage, variables: { input: message } });
    return response.data.createMessage;
  });

  const createNotificationMutation = useMutation<any, any, CreateNotificationInput>(async (notification) => {
    const response = await API.graphql({ query: createNotification, variables: { input: notification } });
    return response.data.createNotification;
  });

  useEffect(() => {
    debounce(async () => {
      if (!isTargetInView || isFetchingNextPage || !hasNextPage || !messagesRef?.current?.f7Messages()) return;
      const { data: nextData } = await fetchNextPage();

      messagesRef.current.f7Messages().scroll(0, lastMessageRef.current.el.offsetTop - 16);
    }, 500)();
  }, [isTargetInView]);

  const createRoom = useMutation(createChatroom());
  const createUserRoom = useMutation(createUserChatroom());
  useEffect(() => {
    f7ready(() => {
      messagebar.current = f7.messagebar.get(`.messagebar-${room_id}`);
      if (newChat) messagebar.current.focus();
    });
    const subscription = onCreateMessagesSubscription().subscribe({
      next: ({ value }) => {
        const message: MessageType = value.data.onCreateMessage;
        if (message.room_id === room_id && currentUser.introduce.toString() !== message.user_id) {
          refetch();
        }
      },
      error: (err) => console.warn(err),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const createUserChatrooms = (cr) =>
    createUserRoom.mutate({
      chatroom_id: cr.id,
      params: {
        user_chatroom: [{ user_id }, { user_id: currentUser.id }],
      },
    });

  const sendMessage = () => {
    const text = messageText.replace(/\n/g, '<br>').trim();
    if (text.length) {
      setSheetVisible(false);
      const newMessageProps = {
        user_id: currentUser.id.toString(),
        text,
      };

      if (room_id === 'new') {
        createRoom.mutate(
          {
            user_id,
            room_type: 'single',
          },
          {
            onSuccess: async (cr: Chatroom) => {
              createUserChatrooms(cr);
              const newMessage = {
                ...newMessageProps,
                room_id: cr.id,
              };
              createMessageMutation.mutate(newMessage, {
                onSuccess: () => {
                  f7router.navigate(`/chatrooms/${cr.id}/single?newChat=true`, {
                    reloadCurrent: true,
                    animate: false,
                  });
                },
              });
            },
          },
        );
      } else {
        const newMessage = {
          ...newMessageProps,
          room_id,
        };
        const tempId = `temp-${moment().format('x')}`;
        queryClient.setQueryData<MessageType[]>(RECV_MESSAGES_KEY, (msgs: any) => [
          ...msgs,
          { ...newMessage, id: tempId, createdAt: moment().utc().format() },
        ]);

        createMessageMutation.mutate(newMessage, {
          onSuccess: (res) => {
            messagebar.current.focus();
            createNotificationMutation.mutate({
              receiver_id: opUser.uuid,
              content: messageText,
              target_type: 'Room',
              target_id: room_id,
              title: currentUser.name,
              redirect_to: `/chatrooms/${room_id}/single`,
            });
          },
        });
        setMessageText('');
      }
    } else {
      // express error
    }
  };

  return (
    <SinglePresenter 
      {...{
        room_id,
        sheetVisible,
        messageText,
        setMessageText,
        setSheetVisible,
        sendMessage,
        messagesRef,
        hasNextPage,
        targetRef,
        chatroom,
        title: opUser?.name,
        lastMessageRef,
        messages,
        currentUser,
      }}
    />
  );
};

export default React.memo(ChatroomSinglePage);
