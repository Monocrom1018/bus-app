import { User } from '@constants';
import { find } from 'lodash';
import moment from 'moment';
// import profile from '@assets/images/profile.png';

const getMessageUser = (user_id, users: User[]) => find(users, { id: Number(user_id) })?.name;

const messageType = (message, currentUserId) =>
  message?.user_id.toString() === currentUserId?.toString() ? 'sent' : 'received';

const sendAtFormat = (message) => moment(message?.createdAt).format('LT');
const isSameTime = (message, diffMessage) => sendAtFormat(message) === sendAtFormat(diffMessage);
const isSameDate = (message, previousMessage, nextMessage) => {
  const messageDate = moment(message.createdAt).format('LL');
  const previousMessageDate = moment(previousMessage?.createdAt).format('LL');
  return messageDate === previousMessageDate;
};

const firstMessageRule = (message, previousMessage, nextMessage) => {
  if (previousMessage?.user_id !== message.user_id) return true;
  if (!isSameTime(message, previousMessage)) return true;
  return false;
};

const lastMessageRule = (message, previousMessage, nextMessage) => {
  if (!nextMessage || nextMessage.user_id !== message.user_id) return true;
  return false;
};

const tailMessageRule = (message, previousMessage, nextMessage) => {
  if (!nextMessage || nextMessage.user_id !== message.user_id) return true;
  if (!isSameTime(message, nextMessage)) return true;

  return false;
};

const getMessageParameters = ({ message, previousMessage, nextMessage, users, currentUserId }) => ({
  type: messageType(message, currentUserId),
  image: message.image,
  avatar: messageType(message, currentUserId) === 'received' ? null : null, // profile : null,
  name: getMessageUser(message.user_id, users),
  first: firstMessageRule(message, previousMessage, nextMessage),
  last: lastMessageRule(message, previousMessage, nextMessage),
  tail: tailMessageRule(message, previousMessage, nextMessage),
});

export { getMessageParameters, isSameDate, sendAtFormat };
