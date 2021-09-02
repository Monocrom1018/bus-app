/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications($filter: ModelNotificationFilterInput, $limit: Int, $nextToken: String) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const messagesByDate = /* GraphQL */ `
  query MessagesByDate(
    $room_id: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByDate(
      room_id: $room_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const notificationSortedByCreatedAt = /* GraphQL */ `
  query NotificationSortedByCreatedAt(
    $createdAt: AWSDateTime
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    NotificationSortedByCreatedAt(
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
