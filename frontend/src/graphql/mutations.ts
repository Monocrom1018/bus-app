/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNotificationAndFcm = /* GraphQL */ `
  mutation CreateNotificationAndFcm(
    $title: String
    $receiver_id: String!
    $content: String!
    $redirect_to: String
    $target_type: String
    $target_id: String
  ) {
    createNotificationAndFcm(
      title: $title
      receiver_id: $receiver_id
      content: $content
      redirect_to: $redirect_to
      target_type: $target_type
      target_id: $target_id
    )
  }
`;
export const callPhoneCertification = /* GraphQL */ `
  mutation CallPhoneCertification($code: String!, $phone_number: String!) {
    callPhoneCertification(code: $code, phone_number: $phone_number)
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!, $condition: ModelMessageConditionInput) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!, $condition: ModelMessageConditionInput) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification($input: CreateNotificationInput!, $condition: ModelNotificationConditionInput) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification($input: UpdateNotificationInput!, $condition: ModelNotificationConditionInput) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification($input: DeleteNotificationInput!, $condition: ModelNotificationConditionInput) {
    deleteNotification(input: $input, condition: $condition) {
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
