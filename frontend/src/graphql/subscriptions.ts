/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNotificationCreateRecevier = /* GraphQL */ `
  subscription OnNotificationCreateRecevier($receiver_id: String!) {
    onNotificationCreateRecevier(receiver_id: $receiver_id) {
      id
      owner
      title
      receiver_id
      content
      redirect_to
      target_type
      target_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessageFilterChatroom = /* GraphQL */ `
  subscription OnCreateMessageFilterChatroom($room_id: String!) {
    onCreateMessageFilterChatroom(room_id: $room_id) {
      id
      user_id
      members
      room_id
      text
      image
      owner
      view
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!, $members: String!) {
    onCreateMessage(owner: $owner, members: $members) {
      id
      user_id
      members
      room_id
      text
      image
      owner
      view
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!, $members: String!) {
    onUpdateMessage(owner: $owner, members: $members) {
      id
      user_id
      members
      room_id
      text
      image
      owner
      view
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!, $members: String!) {
    onDeleteMessage(owner: $owner, members: $members) {
      id
      user_id
      members
      room_id
      text
      image
      owner
      view
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($receiver_id: String!) {
    onCreateNotification(receiver_id: $receiver_id) {
      id
      owner
      title
      receiver_id
      content
      redirect_to
      target_type
      target_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification($receiver_id: String!) {
    onUpdateNotification(receiver_id: $receiver_id) {
      id
      owner
      title
      receiver_id
      content
      redirect_to
      target_type
      target_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification($receiver_id: String!) {
    onDeleteNotification(receiver_id: $receiver_id) {
      id
      owner
      title
      receiver_id
      content
      redirect_to
      target_type
      target_id
      createdAt
      updatedAt
    }
  }
`;
