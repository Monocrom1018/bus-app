/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMessageInput = {
  id?: string | null;
  user_id: string;
  room_id: string;
  text: string;
  image?: string | null;
  owner?: string | null;
  view?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ModelMessageConditionInput = {
  user_id?: ModelStringInput | null;
  room_id?: ModelStringInput | null;
  text?: ModelStringInput | null;
  image?: ModelStringInput | null;
  view?: ModelIntInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMessageConditionInput | null> | null;
  or?: Array<ModelMessageConditionInput | null> | null;
  not?: ModelMessageConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Message = {
  __typename: 'Message';
  id?: string;
  user_id?: string;
  room_id?: string;
  text?: string;
  image?: string | null;
  owner?: string | null;
  view?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateMessageInput = {
  id: string;
  user_id?: string | null;
  room_id?: string | null;
  text?: string | null;
  image?: string | null;
  owner?: string | null;
  view?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type DeleteMessageInput = {
  id: string;
};

export type CreateNotificationInput = {
  id?: string | null;
  title?: string | null;
  receiver_id: string;
  content: string;
  redirect_to?: string | null;
  target_type?: string | null;
  target_id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ModelNotificationConditionInput = {
  title?: ModelStringInput | null;
  receiver_id?: ModelStringInput | null;
  content?: ModelStringInput | null;
  redirect_to?: ModelStringInput | null;
  target_type?: ModelStringInput | null;
  target_id?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelNotificationConditionInput | null> | null;
  or?: Array<ModelNotificationConditionInput | null> | null;
  not?: ModelNotificationConditionInput | null;
};

export type Notification = {
  __typename: 'Notification';
  id?: string;
  title?: string | null;
  receiver_id?: string;
  content?: string;
  redirect_to?: string | null;
  target_type?: string | null;
  target_id?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateNotificationInput = {
  id: string;
  title?: string | null;
  receiver_id?: string | null;
  content?: string | null;
  redirect_to?: string | null;
  target_type?: string | null;
  target_id?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type DeleteNotificationInput = {
  id: string;
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null;
  user_id?: ModelStringInput | null;
  room_id?: ModelStringInput | null;
  text?: ModelStringInput | null;
  image?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  view?: ModelIntInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMessageFilterInput | null> | null;
  or?: Array<ModelMessageFilterInput | null> | null;
  not?: ModelMessageFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelMessageConnection = {
  __typename: 'ModelMessageConnection';
  items?: Array<Message | null> | null;
  nextToken?: string | null;
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  receiver_id?: ModelStringInput | null;
  content?: ModelStringInput | null;
  redirect_to?: ModelStringInput | null;
  target_type?: ModelStringInput | null;
  target_id?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelNotificationFilterInput | null> | null;
  or?: Array<ModelNotificationFilterInput | null> | null;
  not?: ModelNotificationFilterInput | null;
};

export type ModelNotificationConnection = {
  __typename: 'ModelNotificationConnection';
  items?: Array<Notification | null> | null;
  nextToken?: string | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type CreateMessageMutationVariables = {
  input?: CreateMessageInput;
  condition?: ModelMessageConditionInput | null;
};

export type CreateMessageMutation = {
  createMessage?: {
    __typename: 'Message';
    id: string;
    user_id: string;
    room_id: string;
    text: string;
    image?: string | null;
    owner?: string | null;
    view?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateMessageMutationVariables = {
  input?: UpdateMessageInput;
  condition?: ModelMessageConditionInput | null;
};

export type UpdateMessageMutation = {
  updateMessage?: {
    __typename: 'Message';
    id: string;
    user_id: string;
    room_id: string;
    text: string;
    image?: string | null;
    owner?: string | null;
    view?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteMessageMutationVariables = {
  input?: DeleteMessageInput;
  condition?: ModelMessageConditionInput | null;
};

export type DeleteMessageMutation = {
  deleteMessage?: {
    __typename: 'Message';
    id: string;
    user_id: string;
    room_id: string;
    text: string;
    image?: string | null;
    owner?: string | null;
    view?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateNotificationMutationVariables = {
  input?: CreateNotificationInput;
  condition?: ModelNotificationConditionInput | null;
};

export type CreateNotificationMutation = {
  createNotification?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateNotificationMutationVariables = {
  input?: UpdateNotificationInput;
  condition?: ModelNotificationConditionInput | null;
};

export type UpdateNotificationMutation = {
  updateNotification?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteNotificationMutationVariables = {
  input?: DeleteNotificationInput;
  condition?: ModelNotificationConditionInput | null;
};

export type DeleteNotificationMutation = {
  deleteNotification?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetMessageQueryVariables = {
  id?: string;
};

export type GetMessageQuery = {
  getMessage?: {
    __typename: 'Message';
    id: string;
    user_id: string;
    room_id: string;
    text: string;
    image?: string | null;
    owner?: string | null;
    view?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMessagesQuery = {
  listMessages?: {
    __typename: 'ModelMessageConnection';
    items?: Array<{
      __typename: 'Message';
      id: string;
      user_id: string;
      room_id: string;
      text: string;
      image?: string | null;
      owner?: string | null;
      view?: number | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type GetNotificationQueryVariables = {
  id?: string;
};

export type GetNotificationQuery = {
  getNotification?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListNotificationsQuery = {
  listNotifications?: {
    __typename: 'ModelNotificationConnection';
    items?: Array<{
      __typename: 'Notification';
      id: string;
      title?: string | null;
      receiver_id: string;
      content: string;
      redirect_to?: string | null;
      target_type?: string | null;
      target_id?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type MessagesByDateQueryVariables = {
  room_id?: string | null;
  createdAt?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelMessageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type MessagesByDateQuery = {
  messagesByDate?: {
    __typename: 'ModelMessageConnection';
    items?: Array<{
      __typename: 'Message';
      id: string;
      user_id: string;
      room_id: string;
      text: string;
      image?: string | null;
      owner?: string | null;
      view?: number | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type NotificationSortedByCreatedAtQueryVariables = {
  createdAt?: string | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelNotificationFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type NotificationSortedByCreatedAtQuery = {
  NotificationSortedByCreatedAt?: {
    __typename: 'ModelNotificationConnection';
    items?: Array<{
      __typename: 'Notification';
      id: string;
      title?: string | null;
      receiver_id: string;
      content: string;
      redirect_to?: string | null;
      target_type?: string | null;
      target_id?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type OnNotificationCreateRecevierSubscriptionVariables = {
  receiver_id?: string;
};

export type OnNotificationCreateRecevierSubscription = {
  onNotificationCreateRecevier?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateMessageSubscription = {
  onCreateMessage?: {
    __typename: 'Message';
    id: string;
    user_id: string;
    room_id: string;
    text: string;
    image?: string | null;
    owner?: string | null;
    view?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?: {
    __typename: 'Message';
    id: string;
    user_id: string;
    room_id: string;
    text: string;
    image?: string | null;
    owner?: string | null;
    view?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?: {
    __typename: 'Message';
    id: string;
    user_id: string;
    room_id: string;
    text: string;
    image?: string | null;
    owner?: string | null;
    view?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?: {
    __typename: 'Notification';
    id: string;
    title?: string | null;
    receiver_id: string;
    content: string;
    redirect_to?: string | null;
    target_type?: string | null;
    target_id?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};
