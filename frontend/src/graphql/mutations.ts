/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!, $condition: ModelMessageConditionInput) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!, $condition: ModelMessageConditionInput) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification($input: CreateNotificationInput!, $condition: ModelNotificationConditionInput) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification($input: UpdateNotificationInput!, $condition: ModelNotificationConditionInput) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification($input: DeleteNotificationInput!, $condition: ModelNotificationConditionInput) {
    deleteNotification(input: $input, condition: $condition) {
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
