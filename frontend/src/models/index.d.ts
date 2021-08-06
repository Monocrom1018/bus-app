/* eslint-disable max-classes-per-file */
import { ModelInit, MutableModel, PersistentModelConstructor } from '@aws-amplify/datastore';

export declare class Notification {
  readonly id: string;

  readonly receiver_id: string;

  readonly content: string;

  readonly target_type: string;

  readonly target_id: string;

  readonly createdAt: string;

  readonly updatedAt: string;

  constructor(init: ModelInit<Notification>);

  static copyOf(
    source: Notification,
    mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void,
  ): Notification;
}

export declare class Message {
  readonly id: string;

  readonly user_id: string;

  readonly room_id: string;

  readonly text: string;

  readonly image?: string;

  readonly owner?: string;

  readonly view?: number;

  readonly createdAt: string;

  readonly updatedAt: string;

  constructor(init: ModelInit<Message>);

  static copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}
