/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNotificationCreateRecevier = /* GraphQL */ `
  subscription OnNotificationCreateRecevier($receiver_id: String!) {
    onNotificationCreateRecevier(receiver_id: $receiver_id) {
      id
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      user_id
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
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      user_id
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
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      user_id
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
  subscription OnCreateNotification {
    onCreateNotification {
      id
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
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
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
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
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
