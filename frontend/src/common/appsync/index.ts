import { API, graphqlOperation } from '@aws-amplify/api';
import Observable from 'zen-observable-ts';
// import * as mutations from '@graphql/mutations';
// import * as queries from '@graphql/queries';
// import * as subscriptions from '@graphql/subscriptions';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import * as mutations from '../../graphql/mutations';
import { MessageType } from '../constants/schema';

interface MessagesParams {
  room_id: string;
  order?: string;
  limit?: number;
  filter?: any;
}

// Queries
export const getMessageListQuery =
  ({ room_id, order = 'DESC', limit = null, filter }: MessagesParams) =>
  async ({ pageParam = null }) => {
    const params = {
      room_id,
      sortDirection: order,
      nextToken: pageParam,
      limit,
      ...(filter || {}),
    };
    const {
      data: {
        messagesByDate: { items },
      },
    } = await API.graphql(graphqlOperation(queries.messagesByDate, params));
    // items.reverse();
    return items;
  };

export const getMessageInfiniteQuery =
  ({ room_id, order = 'DESC', limit = 20, filter }: MessagesParams) =>
  async ({ pageParam = null }) => {
    const params = {
      room_id,
      sortDirection: order,
      nextToken: pageParam,
      limit,
      ...(filter || {}),
    };
    const {
      data: {
        messagesByDate: { items, nextToken },
      },
    } = await API.graphql(graphqlOperation(queries.messagesByDate, params));
    items.reverse();
    return { items, nextToken };
  };

// Mutations

// Subscriptions
export const onCreateMessagesSubscription = () => {
  const subscription = API.graphql({
    query: subscriptions.onCreateMessage,
  }) as Observable<any>;
  return subscription;
};
